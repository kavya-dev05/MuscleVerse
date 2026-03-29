import { WorkoutPlan, SupplementPlan } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Generate a personalized workout plan using Gemini AI
 */
export const generateWorkoutPlan = async (
  goal: string,
  level: string,
  daysPerWeek: number,
  equipment: string
): Promise<WorkoutPlan | null> => {
  
  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
    console.error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env.local');
    return getFallbackWorkoutPlan(goal, level, daysPerWeek, equipment);
  }

  try {
    const prompt = `You are an expert fitness coach. Create a detailed, personalized ${daysPerWeek}-day workout program with the following specifications:

Goal: ${goal}
Experience Level: ${level}
Training Days per Week: ${daysPerWeek}
Equipment Available: ${equipment}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, no additional text):

{
  "title": "A creative title for this specific program (mention goal and level)",
  "overview": "A 2-3 sentence overview explaining the program's approach and what makes it effective for this specific goal and level",
  "schedule": [
    {
      "dayName": "Day 1",
      "focus": "Muscle group or training type (e.g., 'Push - Chest/Shoulders/Triceps')",
      "exercises": [
        {
          "name": "Specific exercise name",
          "sets": "Number as string",
          "reps": "Rep range as string (e.g., '8-12', '3-5')",
          "notes": "Brief coaching cue or technique tip"
        }
      ]
    }
  ]
}

Requirements:
- Create exactly ${daysPerWeek} days in the schedule array
- Each day should have 4-6 exercises appropriate for the ${level} level
- Exercise selection must match the ${equipment} constraint
- For "${goal}" goal, prioritize exercises that best achieve this outcome
- Use proper exercise names, not generic placeholders
- Vary the training splits appropriately for ${daysPerWeek} days
- Set/rep schemes should match the ${level} level and ${goal} goal
- Notes should include form cues, tempo, or rest periods

Respond with ONLY the JSON object, nothing else.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No content generated from Gemini API');
    }

    // Clean the response - remove markdown code blocks if present
    let cleanedText = generatedText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '');
    cleanedText = cleanedText.replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    // Parse the JSON response
    const workoutPlan: WorkoutPlan = JSON.parse(cleanedText);
    
    return workoutPlan;

  } catch (error) {
    console.error('Error generating workout plan:', error);
    
    // Fallback to intelligent mock data if API fails
    return getFallbackWorkoutPlan(goal, level, daysPerWeek, equipment);
  }
};

/**
 * Generate a personalized supplement plan using Gemini AI
 */
export const generateSupplementPlan = async (
  goal: string,
  diet: string
): Promise<SupplementPlan | null> => {
  
  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER_API_KEY') {
    console.error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env.local');
    return getFallbackSupplementPlan(goal, diet);
  }

  try {
    const prompt = `You are an expert nutritionist and supplement advisor. Create a personalized supplement recommendation with the following details:

Goal: ${goal}
Dietary Approach: ${diet}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, no additional text):

{
  "title": "A creative title for this supplement stack",
  "advice": "2-3 sentences explaining the supplementation strategy for this specific goal and diet",
  "recommendations": [
    {
      "product": "Specific supplement name",
      "reason": "Why this supplement helps achieve the goal",
      "dosage": "Recommended dosage and timing"
    }
  ]
}

Requirements:
- Provide 3-5 evidence-based supplement recommendations
- Tailor recommendations to the "${goal}" goal
- Consider the "${diet}" dietary approach
- Include specific dosage and timing instructions
- Explain the science/benefit of each supplement briefly
- Prioritize safety and effectiveness

Respond with ONLY the JSON object, nothing else.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No content generated from Gemini API');
    }

    // Clean the response
    let cleanedText = generatedText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '');
    cleanedText = cleanedText.replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    const supplementPlan: SupplementPlan = JSON.parse(cleanedText);
    
    return supplementPlan;

  } catch (error) {
    console.error('Error generating supplement plan:', error);
    return getFallbackSupplementPlan(goal, diet);
  }
};

/**
 * Fallback function for workout plans when API is unavailable
 */
function getFallbackWorkoutPlan(
  goal: string,
  level: string,
  daysPerWeek: number,
  equipment: string
): WorkoutPlan {
  
  const title = `${level} ${goal} Protocol`;
  const overview = `This ${daysPerWeek}-day routine is precision-engineered for a ${level} lifter using ${equipment}. Focus on progressive overload to maximize ${goal.toLowerCase()}.`;

  // Create intelligent fallback based on inputs
  const exercisesByGoalAndEquipment = getExerciseDatabase(goal, equipment, level);
  const splits = getSplitForDays(daysPerWeek);
  
  const schedule = splits.map((split, i) => ({
    dayName: `Day ${i + 1}`,
    focus: split.focus,
    exercises: split.exercises.map(ex => ({
      name: exercisesByGoalAndEquipment[ex.category]?.[i % exercisesByGoalAndEquipment[ex.category].length] || ex.name,
      sets: ex.sets,
      reps: ex.reps,
      notes: ex.notes
    }))
  }));

  return { title, overview, schedule };
}

/**
 * Fallback function for supplement plans when API is unavailable
 */
function getFallbackSupplementPlan(goal: string, diet: string): SupplementPlan {
  
  let recommendations = [];
  let title = "";
  let advice = "";

  if (goal.includes("Muscle") || goal.includes("Strength")) {
    title = "The Hypertrophy Stack";
    advice = `To support muscle growth on a ${diet} diet, maximize protein synthesis and recovery with these evidence-based supplements.`;
    recommendations = [
      { product: "Whey Protein Isolate", reason: "Fast-absorbing protein to spike muscle protein synthesis post-workout.", dosage: "1 scoop (25g) post-workout" },
      { product: "Creatine Monohydrate", reason: "Increases ATP production for strength and muscle volume.", dosage: "5g daily" },
      { product: "Pre-Workout (Caffeine + Citrulline)", reason: "Enhances focus and blood flow during training.", dosage: "1 serving 30 mins before gym" }
    ];
  } else if (goal.includes("Lose") || goal.includes("Fat")) {
    title = "The Shred Stack";
    advice = `Focusing on fat loss while maintaining lean muscle on a ${diet} diet requires metabolic support.`;
    recommendations = [
      { product: "L-Carnitine", reason: "Helps transport fatty acids into cells to be burned for energy.", dosage: "2g pre-workout" },
      { product: "Whey Protein Isolate", reason: "High protein increases satiety and preserves muscle during cutting.", dosage: "1-2 scoops daily" },
      { product: "Multivitamin", reason: "Ensures micronutrient needs are met during a caloric deficit.", dosage: "1 serving with breakfast" }
    ];
  } else {
    title = "The Performance Stack";
    advice = `Optimizing general performance and recovery for a ${diet} lifestyle.`;
    recommendations = [
      { product: "Multivitamin", reason: "Foundational health coverage.", dosage: "Daily" },
      { product: "Fish Oil (Omega-3)", reason: "Reduces inflammation and supports joint health.", dosage: "2g daily" },
      { product: "Magnesium", reason: "Improves sleep quality and muscle relaxation.", dosage: "400mg before bed" }
    ];
  }

  return { title, advice, recommendations };
}

// Helper functions for fallback data
function getSplitForDays(days: number) {
  if (days <= 3) {
    return [
      { focus: 'Full Body A', exercises: [
        { category: 'compound', name: 'Squat', sets: '4', reps: '6-8', notes: 'Focus on depth' },
        { category: 'upper', name: 'Bench Press', sets: '4', reps: '6-8', notes: 'Control the eccentric' },
        { category: 'back', name: 'Barbell Row', sets: '3', reps: '8-10', notes: 'Pull to lower chest' },
        { category: 'isolation', name: 'Face Pulls', sets: '3', reps: '12-15', notes: 'Rear delt focus' }
      ]},
      { focus: 'Full Body B', exercises: [
        { category: 'compound', name: 'Deadlift', sets: '4', reps: '5-6', notes: 'Keep back neutral' },
        { category: 'upper', name: 'Overhead Press', sets: '4', reps: '6-8', notes: 'Squeeze glutes' },
        { category: 'back', name: 'Pull-ups', sets: '3', reps: '8-10', notes: 'Full ROM' },
        { category: 'isolation', name: 'Lateral Raises', sets: '3', reps: '12-15', notes: 'Slight lean forward' }
      ]},
      { focus: 'Full Body C', exercises: [
        { category: 'compound', name: 'Front Squat', sets: '4', reps: '6-8', notes: 'Upright torso' },
        { category: 'upper', name: 'Incline Press', sets: '4', reps: '8-10', notes: 'Upper chest focus' },
        { category: 'back', name: 'Cable Row', sets: '3', reps: '10-12', notes: 'Squeeze scapula' },
        { category: 'isolation', name: 'Bicep Curls', sets: '3', reps: '10-12', notes: 'No momentum' }
      ]}
    ].slice(0, days);
  } else if (days <= 4) {
    return [
      { focus: 'Upper Power', exercises: [
        { category: 'upper', name: 'Bench Press', sets: '5', reps: '3-5', notes: 'Heavy weight' },
        { category: 'back', name: 'Barbell Row', sets: '5', reps: '3-5', notes: 'Explosive pull' },
        { category: 'upper', name: 'Overhead Press', sets: '4', reps: '6-8', notes: 'Strict form' },
        { category: 'isolation', name: 'Face Pulls', sets: '3', reps: '15-20', notes: 'High reps' }
      ]},
      { focus: 'Lower Power', exercises: [
        { category: 'compound', name: 'Squat', sets: '5', reps: '3-5', notes: 'Heavy, below parallel' },
        { category: 'compound', name: 'Deadlift', sets: '4', reps: '3-5', notes: 'Maximum tension' },
        { category: 'isolation', name: 'Leg Press', sets: '3', reps: '10-12', notes: 'Deep stretch' },
        { category: 'isolation', name: 'Hamstring Curls', sets: '3', reps: '12-15', notes: 'Slow eccentric' }
      ]},
      { focus: 'Upper Hypertrophy', exercises: [
        { category: 'upper', name: 'Incline Dumbbell Press', sets: '4', reps: '8-12', notes: 'Full stretch' },
        { category: 'back', name: 'Weighted Pull-ups', sets: '4', reps: '8-12', notes: 'Chest to bar' },
        { category: 'isolation', name: 'Cable Flyes', sets: '3', reps: '12-15', notes: 'Squeeze at peak' },
        { category: 'isolation', name: 'Tricep Pushdowns', sets: '3', reps: '12-15', notes: 'Lockout hard' }
      ]},
      { focus: 'Lower Hypertrophy', exercises: [
        { category: 'compound', name: 'Bulgarian Split Squat', sets: '4', reps: '10-12', notes: 'Each leg' },
        { category: 'compound', name: 'Romanian Deadlift', sets: '4', reps: '10-12', notes: 'Feel hamstrings' },
        { category: 'isolation', name: 'Leg Extensions', sets: '3', reps: '15-20', notes: 'Pump work' },
        { category: 'isolation', name: 'Calf Raises', sets: '4', reps: '15-20', notes: 'Full ROM' }
      ]}
    ].slice(0, days);
  } else {
    return [
      { focus: 'Push - Chest/Shoulders/Triceps', exercises: [
        { category: 'upper', name: 'Flat Bench Press', sets: '4', reps: '6-8', notes: 'Retract scapula' },
        { category: 'upper', name: 'Overhead Press', sets: '4', reps: '8-10', notes: 'Core tight' },
        { category: 'isolation', name: 'Incline Flyes', sets: '3', reps: '12-15', notes: 'Upper chest' },
        { category: 'isolation', name: 'Lateral Raises', sets: '3', reps: '12-15', notes: 'Side delts' },
        { category: 'isolation', name: 'Tricep Dips', sets: '3', reps: '10-12', notes: 'Lean forward' }
      ]},
      { focus: 'Pull - Back/Biceps', exercises: [
        { category: 'back', name: 'Pull-ups', sets: '4', reps: '6-10', notes: 'Add weight if able' },
        { category: 'back', name: 'Barbell Row', sets: '4', reps: '8-10', notes: 'Pull to navel' },
        { category: 'back', name: 'Cable Row', sets: '3', reps: '10-12', notes: 'Squeeze back' },
        { category: 'isolation', name: 'Face Pulls', sets: '3', reps: '15-20', notes: 'Rear delts' },
        { category: 'isolation', name: 'Barbell Curls', sets: '3', reps: '10-12', notes: 'Strict form' }
      ]},
      { focus: 'Legs - Quads/Hams/Calves', exercises: [
        { category: 'compound', name: 'Back Squat', sets: '4', reps: '6-8', notes: 'ATG depth' },
        { category: 'compound', name: 'Romanian Deadlift', sets: '4', reps: '8-10', notes: 'Hamstring stretch' },
        { category: 'isolation', name: 'Leg Press', sets: '3', reps: '12-15', notes: 'High volume' },
        { category: 'isolation', name: 'Leg Curls', sets: '3', reps: '12-15', notes: 'Pause at top' },
        { category: 'isolation', name: 'Calf Raises', sets: '4', reps: '15-20', notes: 'Full stretch' }
      ]},
      { focus: 'Upper Body', exercises: [
        { category: 'upper', name: 'Incline Press', sets: '4', reps: '8-10', notes: 'Upper chest focus' },
        { category: 'back', name: 'Weighted Chin-ups', sets: '4', reps: '6-10', notes: 'Bicep engagement' },
        { category: 'upper', name: 'Dumbbell Shoulder Press', sets: '3', reps: '10-12', notes: 'Full ROM' },
        { category: 'isolation', name: 'Hammer Curls', sets: '3', reps: '12-15', notes: 'Brachialis focus' },
        { category: 'isolation', name: 'Overhead Tricep Extension', sets: '3', reps: '12-15', notes: 'Stretch triceps' }
      ]},
      { focus: 'Lower Body', exercises: [
        { category: 'compound', name: 'Front Squat', sets: '4', reps: '8-10', notes: 'Quad emphasis' },
        { category: 'compound', name: 'Conventional Deadlift', sets: '3', reps: '5-6', notes: 'Heavy pulls' },
        { category: 'isolation', name: 'Walking Lunges', sets: '3', reps: '12/leg', notes: 'Stability work' },
        { category: 'isolation', name: 'Leg Extensions', sets: '3', reps: '15-20', notes: 'Quad pump' },
        { category: 'isolation', name: 'Seated Calf Raises', sets: '3', reps: '20-25', notes: 'Soleus focus' }
      ]},
      { focus: 'Push Volume', exercises: [
        { category: 'upper', name: 'Dumbbell Bench Press', sets: '4', reps: '10-12', notes: 'Greater ROM' },
        { category: 'upper', name: 'Arnold Press', sets: '4', reps: '10-12', notes: 'All delt heads' },
        { category: 'isolation', name: 'Cable Flyes', sets: '3', reps: '15-20', notes: 'Constant tension' },
        { category: 'isolation', name: 'Lateral Raises', sets: '4', reps: '15-20', notes: 'Drop sets' },
        { category: 'isolation', name: 'Cable Pushdowns', sets: '3', reps: '15-20', notes: 'Tricep pump' }
      ]},
      { focus: 'Cardio & Core', exercises: [
        { category: 'isolation', name: 'HIIT Cardio', sets: '1', reps: '20 min', notes: '30s on/30s off' },
        { category: 'isolation', name: 'Planks', sets: '3', reps: '60s', notes: 'Hollow body' },
        { category: 'isolation', name: 'Hanging Leg Raises', sets: '3', reps: '12-15', notes: 'Lower abs' },
        { category: 'isolation', name: 'Russian Twists', sets: '3', reps: '20/side', notes: 'Obliques' }
      ]}
    ].slice(0, days);
  }
}

function getExerciseDatabase(goal: string, equipment: string, level: string) {
  // Return exercise variations based on equipment
  return {
    compound: equipment.includes('Bodyweight') 
      ? ['Push-ups', 'Squats', 'Lunges', 'Bulgarian Split Squats']
      : ['Squat', 'Deadlift', 'Bench Press', 'Overhead Press', 'Barbell Row'],
    upper: equipment.includes('Bodyweight')
      ? ['Diamond Push-ups', 'Pike Push-ups', 'Wide Push-ups']
      : equipment.includes('Dumbbells')
      ? ['Dumbbell Press', 'Dumbbell Shoulder Press', 'Dumbbell Bench Press']
      : ['Bench Press', 'Overhead Press', 'Incline Press'],
    back: equipment.includes('Bodyweight')
      ? ['Pull-ups', 'Chin-ups', 'Inverted Rows']
      : ['Barbell Row', 'Pull-ups', 'Cable Row', 'T-Bar Row'],
    isolation: equipment.includes('Bodyweight')
      ? ['Tricep Dips', 'Leg Raises', 'Plank Variations']
      : ['Cable Flyes', 'Lateral Raises', 'Tricep Extensions', 'Bicep Curls']
  };
}
