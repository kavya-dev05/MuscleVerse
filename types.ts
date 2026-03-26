export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  title: string;
  overview: string;
  schedule: WorkoutDay[];
}

export interface ClassItem {
  id: number;
  title: string;
  time: string;
  instructor: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  image: string;
}

export interface Trainer {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

export interface SupplementRecommendation {
  product: string;
  reason: string;
  dosage: string;
}

export interface SupplementPlan {
  title: string;
  advice: string;
  recommendations: SupplementRecommendation[];
}