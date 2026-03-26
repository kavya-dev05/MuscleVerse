import { WorkoutPlan, SupplementPlan } from '../types';

// MOCK DATA GENERATORS
// Since we are running without an API Key, we simulate the AI's intelligence
// by returning pre-defined, high-quality plans based on the user's inputs.

export const generateWorkoutPlan = async (
  goal: string,
  level: string,
  daysPerWeek: number,
  equipment: string
): Promise<WorkoutPlan | null> => {
  
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Logic to customize the title based on inputs
  const title = `${level} ${goal} Protocol`;
  const overview = `This ${daysPerWeek}-day routine is precision-engineered for a ${level} lifter using ${equipment}. The focus is on progressive overload to maximize ${goal.toLowerCase()}.`;

  // Mock Schedule Generation
  const schedule = [];
  const splits = ['Push (Chest/Triceps/Shoulders)', 'Pull (Back/Biceps)', 'Legs (Quads/Hams/Calves)', 'Upper Body', 'Lower Body', 'Full Body', 'Cardio & Abs'];
  
  for (let i = 0; i < daysPerWeek; i++) {
    schedule.push({
      dayName: `Day ${i + 1}`,
      focus: splits[i % splits.length],
      exercises: [
        { name: "Compound Movement (e.g., Bench/Squat)", sets: "4", reps: "6-8", notes: "Heavy weight, 3 min rest" },
        { name: "Secondary Compound", sets: "3", reps: "8-10", notes: "Focus on form" },
        { name: "Isolation Movement", sets: "3", reps: "12-15", notes: "Squeeze at the top" },
        { name: "Finisher / Accessory", sets: "3", reps: "Failure", notes: "High intensity" }
      ]
    });
  }

  return {
    title,
    overview,
    schedule
  };
};

export const generateSupplementPlan = async (
  goal: string,
  diet: string
): Promise<SupplementPlan | null> => {
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  let recommendations = [];
  let title = "";
  let advice = "";

  // Logic for recommendations
  if (goal.includes("Muscle") || goal.includes("Strength")) {
    title = "The Hypertrophy Stack";
    advice = `To support muscle growth on a ${diet} diet, you need to maximize protein synthesis and recovery.`;
    recommendations = [
      { product: "Whey Protein Isolate", reason: "Fast-absorbing protein to spike muscle protein synthesis post-workout.", dosage: "1 scoop (25g) post-workout" },
      { product: "Creatine Monohydrate", reason: "Increases ATP production for strength and muscle volume.", dosage: "5g daily" },
      { product: "Pre-Workout (Caffeine + Citrulline)", reason: "Enhances focus and blood flow (pump) during training.", dosage: "1 serving 30 mins before gym" }
    ];
  } else if (goal.includes("Lose") || goal.includes("Fat")) {
    title = "The Shred Stack";
    advice = `Focusing on fat loss while maintaining lean muscle on a ${diet} diet requires metabolic support.`;
    recommendations = [
      { product: "L-Carnitine", reason: "Helps transport fatty acids into cells to be burned for energy.", dosage: "2g pre-workout" },
      { product: "Whey Protein Isolate", reason: "High protein intake increases satiety and preserves muscle while cutting.", dosage: "1-2 scoops daily" },
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

  return {
    title,
    advice,
    recommendations
  };
}
