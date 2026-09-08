import React, { useState, useEffect } from "react";
import { 
  Rotate3d, 
  Search, 
  Sparkles, 
  Dumbbell, 
  Layers, 
  ShieldCheck, 
  Flame, 
  Info, 
  Maximize2, 
  Play, 
  Pause,
  ChevronRight,
  Eye
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export const MUSCLE_DATA = [
  // CHEST & TORSO
  {
    id: "pec-major",
    name: "Pectoralis Major",
    latin: "Musculus pectoralis major",
    group: "Chest",
    category: "Push",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Horizontal adduction, internal rotation, and flexion of the humerus (pushing movements).",
    exercises: ["Barbell Bench Press", "Incline Dumbbell Press", "Dips", "Cable Chest Flyes", "Push-ups"],
    stretches: ["Doorway Chest Stretch", "Behind-the-Back Clasp"],
    recoveryTip: "Allow 48-72h between heavy pressing sessions. Focus on full scapular retraction.",
    position: { x: 50, y: 28 },
    color: "#8b5cf6"
  },
  {
    id: "pec-minor",
    name: "Pectoralis Minor",
    latin: "Musculus pectoralis minor",
    group: "Chest",
    category: "Push",
    side: "ANTERIOR",
    layer: "DEEP",
    function: "Depresses and stabilizes the scapula, aids in rib elevation during deep respiration.",
    exercises: ["Incline Cable Press", "Dumbbell Pullover", "Parallel Bar Dips"],
    stretches: ["Foam Roller Thoracic Extension", "Corner Wall Stretch"],
    recoveryTip: "Tightness can cause rounded shoulders. Regularly mobilize the anterior shoulder capsule.",
    position: { x: 42, y: 26 },
    color: "#a855f7"
  },
  {
    id: "serratus-ant",
    name: "Serratus Anterior",
    latin: "Musculus serratus anterior",
    group: "Core",
    category: "Push",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Protracts and rotates scapula upwards (Boxer's Muscle), prevents scapular winging.",
    exercises: ["Push-Up Plus", "Overhead Dumbbell Shrugs", "Ab Roller Rollouts", "Cable Punches"],
    stretches: ["Overhead Lat Stretch with Thoracic Rotation"],
    recoveryTip: "Crucial for overhead shoulder health and stability during heavy overhead presses.",
    position: { x: 38, y: 35 },
    color: "#06b6d4"
  },

  // SHOULDERS
  {
    id: "deltoid-ant",
    name: "Anterior Deltoid (Front Delt)",
    latin: "Pars clavicularis musculi deltoidei",
    group: "Shoulders",
    category: "Push",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Flexion and internal rotation of the arm at the glenohumeral joint.",
    exercises: ["Overhead Barbell Press", "Standing Dumbbell Shoulder Press", "Incline Dumbbell Press"],
    stretches: ["Cross-Body Shoulder Stretch", "Hands Interlaced Extension"],
    recoveryTip: "Often overdeveloped relative to rear delts due to heavy bench pressing.",
    position: { x: 32, y: 24 },
    color: "#ec4899"
  },
  {
    id: "deltoid-lat",
    name: "Lateral Deltoid (Side Delt)",
    latin: "Pars acromialis musculi deltoidei",
    group: "Shoulders",
    category: "Push",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Abduction of the arm beyond 15 degrees, gives upper body wide V-taper silhouette.",
    exercises: ["Dumbbell Lateral Raises", "Cable Lateral Raises", "Lu Raises", "Upright Rows"],
    stretches: ["Behind-Back Arm Pull"],
    recoveryTip: "Responds best to higher rep ranges (12-20 reps) with controlled eccentric tempos.",
    position: { x: 28, y: 26 },
    color: "#f43f5e"
  },
  {
    id: "deltoid-post",
    name: "Posterior Deltoid (Rear Delt)",
    latin: "Pars spinalis musculi deltoidei",
    group: "Shoulders",
    category: "Pull",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Horizontal abduction and external rotation of the humerus, supports shoulder posture.",
    exercises: ["Face Pulls", "Rear Delt Reverse Flyes", "Chest-Supported Row", "Cable Y-Raises"],
    stretches: ["Cross-Arm Shoulder Hug Stretch"],
    recoveryTip: "Train with high volume to balance anterior delt dominance and protect rotator cuff.",
    position: { x: 28, y: 24 },
    color: "#f43f5e"
  },
  {
    id: "rotator-cuff",
    name: "Rotator Cuff Complex",
    latin: "Supraspinatus, Infraspinatus, Teres Minor, Subscapularis",
    group: "Shoulders",
    category: "Stabilizer",
    side: "POSTERIOR",
    layer: "DEEP",
    function: "Dynamic stabilization of the humeral head in the glenoid cavity during arm motions.",
    exercises: ["External Cable Rotations", "Face Pulls", "Dumbbell Cuban Press", "Band Pull-Aparts"],
    stretches: ["Sleeper Stretch", "Subscapularis Wall Slide"],
    recoveryTip: "Warm up thoroughly with light resistance bands before every upper body workout.",
    position: { x: 35, y: 25 },
    color: "#f59e0b"
  },

  // ARMS
  {
    id: "biceps",
    name: "Biceps Brachii",
    latin: "Musculus biceps brachii",
    group: "Arms",
    category: "Pull",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Flexion of elbow, powerful supination of the forearm, weak shoulder flexion.",
    exercises: ["Barbell Curls", "Incline Dumbbell Curls", "Preacher Curls", "Chin-ups", "Hammer Curls"],
    stretches: ["Wall Biceps Stretch", "Seated Floor Hand Turn"],
    recoveryTip: "Vary grip width (narrow for long head peak, wide for short head thickness).",
    position: { x: 26, y: 32 },
    color: "#10b981"
  },
  {
    id: "triceps",
    name: "Triceps Brachii (3 Heads)",
    latin: "Musculus triceps brachii",
    group: "Arms",
    category: "Push",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Extension of the elbow joint; long head assists in arm adduction and extension at shoulder.",
    exercises: ["Overhead Triceps Extension", "Cable Triceps Pushdown", "Skull Crushers", "Close-Grip Bench Press"],
    stretches: ["Overhead Triceps Stretch"],
    recoveryTip: "Accounts for ~60% of upper arm mass. Train overhead movements for long head stretch.",
    position: { x: 26, y: 32 },
    color: "#3b82f6"
  },
  {
    id: "forearms",
    name: "Forearm Flexors & Extensors",
    latin: "Brachioradialis, Flexor & Extensor Carpi",
    group: "Arms",
    category: "Pull",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Wrist flexion, wrist extension, and grip strength transmission.",
    exercises: ["Farmer's Walks", "Wrist Curls & Reverse Wrist Curls", "Reverse Grip Barbell Curls"],
    stretches: ["Prayer Stretch", "Wrist Extensor Pull"],
    recoveryTip: "Direct forearm grip strength transfers immediately to deadlifts and pull-ups.",
    position: { x: 22, y: 42 },
    color: "#14b8a6"
  },

  // BACK
  {
    id: "lats",
    name: "Latissimus Dorsi (Lats)",
    latin: "Musculus latissimus dorsi",
    group: "Back",
    category: "Pull",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Adduction, extension, and internal rotation of the arm (vertical/horizontal pulling).",
    exercises: ["Weighted Pull-ups", "Lat Pulldowns", "Barbell Bent-Over Rows", "Single-Arm Dumbbell Rows"],
    stretches: ["Hanging Bar Lat Stretch", "Kneeling Bench Prayer Stretch"],
    recoveryTip: "Think 'elbows into hip pockets' to maximize lat contraction and minimize bicep takeover.",
    position: { x: 42, y: 36 },
    color: "#8b5cf6"
  },
  {
    id: "traps",
    name: "Trapezius (Upper, Mid, Lower)",
    latin: "Musculus trapezius",
    group: "Back",
    category: "Pull",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Upper: elevates scapula; Middle: retracts scapula; Lower: depresses scapula.",
    exercises: ["Barbell Shrugs", "Face Pulls", "Kelso Shrugs", "Rack Pulls", "Y-Raises"],
    stretches: ["Upper Trap Neck Stretch", "Eagle Arms Stretch"],
    recoveryTip: "Desk work often locks upper traps in tension. Use lower trap exercises to counter.",
    position: { x: 50, y: 20 },
    color: "#a855f7"
  },
  {
    id: "rhomboids",
    name: "Rhomboids (Major & Minor)",
    latin: "Musculi rhomboidei",
    group: "Back",
    category: "Pull",
    side: "POSTERIOR",
    layer: "DEEP",
    function: "Retracts and stabilizes scapula, squeezes shoulder blades toward the spine.",
    exercises: ["Seated Cable Rows", "T-Bar Rows", "Chest-Supported Dumbbell Rows", "Band Pull-Aparts"],
    stretches: ["Cross-Body Arm Hug", "Cat-Cow Pose"],
    recoveryTip: "Critical for combating kyphotic rounded shoulders from prolonged screen time.",
    position: { x: 45, y: 28 },
    color: "#6366f1"
  },
  {
    id: "erector-spinae",
    name: "Erector Spinae (Lower Back)",
    latin: "Musculus erector spinae",
    group: "Back",
    category: "Posterior Chain",
    side: "POSTERIOR",
    layer: "DEEP",
    function: "Extends and laterally flexes the vertebral column, maintains upright spinal alignment.",
    exercises: ["Conventional Deadlift", "Romanian Deadlift", "Back Extensions (Hyperextensions)", "Good Mornings"],
    stretches: ["Child's Pose", "Sphinx Pose", "Knee-to-Chest Stretch"],
    recoveryTip: "Never round the lumbar spine under heavy loads. Strengthen glutes to take strain off lower back.",
    position: { x: 50, y: 44 },
    color: "#f97316"
  },

  // CORE & ABS
  {
    id: "rectus-abs",
    name: "Rectus Abdominis (6-Pack)",
    latin: "Musculus rectus abdominis",
    group: "Core",
    category: "Core",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Flexion of the lumbar spine, posterior pelvic tilt, core bracing during squats.",
    exercises: ["Hanging Leg Raises", "Cable Crunches", "Ab Roller Rollouts", "Planks"],
    stretches: ["Cobra Pose (Upward Dog)"],
    recoveryTip: "Abs are revealed through caloric deficit and thickened through progressive loaded flexion.",
    position: { x: 50, y: 38 },
    color: "#06b6d4"
  },
  {
    id: "obliques",
    name: "External & Internal Obliques",
    latin: "Musculi obliqui abdominis",
    group: "Core",
    category: "Core",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Lateral flexion and rotation of the trunk, stabilizes spine against rotational forces.",
    exercises: ["Russian Twists", "Pallof Press", "Woodchops", "Hanging Knee Twists", "Side Planks"],
    stretches: ["Standing Lateral Side Reach", "Supine Spinal Twist"],
    recoveryTip: "Anti-rotational movements (like Pallof press) build functional athletic spinal stability.",
    position: { x: 40, y: 40 },
    color: "#0ea5e9"
  },

  // LOWER BODY - GLUTES & THIGHS
  {
    id: "glute-max",
    name: "Gluteus Maximus",
    latin: "Musculus gluteus maximus",
    group: "Lower Body",
    category: "Legs",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Primary hip extensor, external rotator of the hip, strongest muscle in the human body.",
    exercises: ["Barbell Hip Thrusts", "Barbell Back Squats", "Romanian Deadlifts", "Bulgarian Split Squats"],
    stretches: ["Pigeon Pose", "Figure-4 Glute Stretch"],
    recoveryTip: "Essential for running speed, vertical jump, and protecting the lower back and knees.",
    position: { x: 44, y: 52 },
    color: "#f43f5e"
  },
  {
    id: "glute-med",
    name: "Gluteus Medius & Minimus",
    latin: "Musculi gluteus medius et minimus",
    group: "Lower Body",
    category: "Legs",
    side: "POSTERIOR",
    layer: "DEEP",
    function: "Abduction and stabilization of the pelvis during single-leg support (walking/sprinting).",
    exercises: ["Cable Hip Abductions", "Seated Machine Abductors", "Lateral Band Walks", "Step-ups"],
    stretches: ["Seated Piriformis Cross Stretch"],
    recoveryTip: "Weak glute medius is the #1 cause of knee valgus (knees caving in on squats).",
    position: { x: 36, y: 48 },
    color: "#fb7185"
  },
  {
    id: "quads",
    name: "Quadriceps Femoris (4 Heads)",
    latin: "Rectus femoris, Vastus lateralis, Vastus medialis (VMO), Vastus intermedius",
    group: "Lower Body",
    category: "Legs",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Powerful extension of the knee joint; rectus femoris also flexes the hip.",
    exercises: ["Barbell Back Squat", "Leg Press", "Hack Squat", "Walking Lunges", "Leg Extension"],
    stretches: ["Standing Quad Stretch", "Couch Stretch (Hip Flexor + Quad)"],
    recoveryTip: "Strengthening the Vastus Medialis (VMO / Teardrop) keeps the patella tracking smoothly.",
    position: { x: 42, y: 60 },
    color: "#10b981"
  },
  {
    id: "hamstrings",
    name: "Hamstring Complex (3 Muscles)",
    latin: "Biceps femoris, Semitendinosus, Semimembranosus",
    group: "Lower Body",
    category: "Legs",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Flexion of the knee and extension of the hip joint; decelerates knee in sprinting.",
    exercises: ["Romanian Deadlifts (RDL)", "Lying Leg Curls", "Seated Leg Curls", "Nordic Hamstring Curls"],
    stretches: ["Hurdler Hamstring Stretch", "Elevated Heel Hinge Stretch"],
    recoveryTip: "Include both hip hinge (RDL) and knee flexion (curl) exercises for complete development.",
    position: { x: 42, y: 62 },
    color: "#8b5cf6"
  },
  {
    id: "calves",
    name: "Calf Complex (Gastrocnemius & Soleus)",
    latin: "Musculus triceps surae",
    group: "Lower Body",
    category: "Legs",
    side: "POSTERIOR",
    layer: "SUPERFICIAL",
    function: "Plantar flexion of the foot at the ankle joint, propulsion during walking and sprinting.",
    exercises: ["Standing Calf Raises", "Seated Calf Raises (Soleus)", "Donkey Calf Raises", "Jump Rope"],
    stretches: ["Wall Calf Stretch with Straight Leg", "Bent-Knee Soleus Stretch"],
    recoveryTip: "Perform standing raises for Gastrocnemius (straight knee) and seated for Soleus (bent knee).",
    position: { x: 42, y: 78 },
    color: "#06b6d4"
  },
  {
    id: "tibialis",
    name: "Tibialis Anterior (Shin)",
    latin: "Musculus tibialis anterior",
    group: "Lower Body",
    category: "Legs",
    side: "ANTERIOR",
    layer: "SUPERFICIAL",
    function: "Dorsiflexion and inversion of the foot, absorbs landing shock to prevent shin splints.",
    exercises: ["Tibialis Raises (Against Wall)", "Kettlebell Toe Lifts", "Heel Walking Drills"],
    stretches: ["Kneeling Shin Stretch"],
    recoveryTip: "Crucial for runners and basketball players to eliminate shin splints and protect knees.",
    position: { x: 42, y: 76 },
    color: "#0ea5e9"
  }
];

export const Human3DMuscleVisualizer = ({ onSelectMuscleForWorkout }) => {
  const { isDark } = useTheme();
  
  // State
  const [selectedMuscle, setSelectedMuscle] = useState(MUSCLE_DATA[0]);
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [viewSide, setViewSide] = useState("ANTERIOR"); // ANTERIOR, POSTERIOR
  const [activeLayer, setActiveLayer] = useState("SUPERFICIAL"); // SUPERFICIAL, DEEP
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Auto-rotate effect
  useEffect(() => {
    let interval = null;
    if (autoRotate) {
      interval = setInterval(() => {
        setRotationAngle(prev => {
          const next = (prev + 10) % 360;
          if (next >= 90 && next < 270) {
            setViewSide("POSTERIOR");
          } else {
            setViewSide("ANTERIOR");
          }
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Filter muscles
  const filteredMuscles = MUSCLE_DATA.filter(m => {
    const matchFilter = activeFilter === "All" || m.group === activeFilter || m.category === activeFilter;
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.exercises.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const visibleHotspots = MUSCLE_DATA.filter(m => 
    m.side === viewSide && (activeLayer === "DEEP" || m.layer === activeLayer)
  );

  const activeFocus = hoveredMuscle || selectedMuscle;

  return (
    <div className="space-y-6">
      
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800 flex items-center gap-1.5">
              <Rotate3d className="w-3.5 h-3.5" /> 3D Muscle Anatomy Explorer
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            Human Anatomy & Biomechanical Muscle Map
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Rotate 360°, inspect superficial and deep muscle layers, and discover targeted compound exercises.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Front / Back Toggle */}
          <div className="flex bg-[var(--bg-card-nested)] p-1 rounded-2xl border border-[var(--border-main)]">
            <button
              onClick={() => { setViewSide("ANTERIOR"); setRotationAngle(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewSide === "ANTERIOR"
                  ? "bg-[#4f46e5] text-white shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Front (Anterior)
            </button>
            <button
              onClick={() => { setViewSide("POSTERIOR"); setRotationAngle(180); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewSide === "POSTERIOR"
                  ? "bg-[#4f46e5] text-white shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Back (Posterior)
            </button>
          </div>

          {/* Auto-Rotate 360 Button */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
              autoRotate
                ? "bg-purple-600 border-purple-400 text-white animate-pulse"
                : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoRotate ? "Rotating" : "360° Spin"}</span>
          </button>
        </div>
      </div>

      {/* 2. MUSCLE GROUP FILTER PILLS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {["All", "Chest", "Back", "Shoulders", "Arms", "Core", "Lower Body"].map((grp) => (
            <button
              key={grp}
              onClick={() => setActiveFilter(grp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activeFilter === grp
                  ? "bg-[#4f46e5] border-indigo-500 text-white font-extrabold shadow-sm"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* Search Muscle */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search muscle or exercise..."
            className="w-full bg-[var(--bg-card)] border border-[var(--border-main)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. MAIN 3D VISUALIZER STAGE & ANATOMICAL INTELLIGENCE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 3D Human Body Canvas (7 COLS) */}
        <div className="lg:col-span-7 fit-card p-6 rounded-3xl relative overflow-hidden flex flex-col items-center min-h-[560px]">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Layer Selector Top Left */}
          <div className="absolute top-4 left-4 z-10 flex gap-1 bg-[var(--bg-card-nested)]/90 backdrop-blur-sm p-1 rounded-xl border border-[var(--border-main)] text-[10px] font-bold">
            <button
              onClick={() => setActiveLayer("SUPERFICIAL")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeLayer === "SUPERFICIAL" ? "bg-[#4f46e5] text-white" : "text-slate-400 hover:text-[var(--text-primary)]"
              }`}
            >
              Superficial
            </button>
            <button
              onClick={() => setActiveLayer("DEEP")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeLayer === "DEEP" ? "bg-[#4f46e5] text-white" : "text-slate-400 hover:text-[var(--text-primary)]"
              }`}
            >
              Deep Muscles
            </button>
          </div>

          {/* Active View Label Top Right */}
          <div className="absolute top-4 right-4 z-10 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-purple-400 tracking-wider">
            {viewSide} VIEW • {activeLayer}
          </div>

          {/* 3D Vector & Anatomy SVG Model Stage */}
          <div className="relative w-full max-w-sm h-[480px] my-auto flex items-center justify-center select-none">
            
            {/* SVG Anatomy Silhouette Base with Holographic Grid */}
            <svg
              viewBox="0 0 300 520"
              className="w-full h-full filter drop-shadow-2xl transition-transform duration-500"
              style={{
                transform: `rotateY(${rotationAngle}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#2c2a55" : "#cbd5e1"} />
                  <stop offset="50%" stopColor={isDark ? "#1a1c3f" : "#94a3b8"} />
                  <stop offset="100%" stopColor={isDark ? "#0f1128" : "#64748b"} />
                </linearGradient>
                <linearGradient id="muscleHighlight" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <radialGradient id="hologramCircle" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Hologram Floor Ring */}
              <ellipse cx="150" cy="500" rx="90" ry="16" fill="url(#hologramCircle)" />
              <ellipse cx="150" cy="500" rx="70" ry="12" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow origin-[150px_500px]" />

              {/* Human Body Silhouette Mesh Paths */}
              {viewSide === "ANTERIOR" ? (
                // ANTERIOR (FRONT) BODY PATHS
                <g className="transition-all duration-300">
                  {/* Head & Neck */}
                  <ellipse cx="150" cy="40" rx="20" ry="26" fill="url(#bodyGrad)" stroke="#4f46e5" strokeWidth="1.5" />
                  <path d="M 142 64 L 140 85 L 160 85 L 158 64 Z" fill="url(#bodyGrad)" />

                  {/* Shoulders & Clavicle */}
                  <path d="M 120 85 Q 150 82 180 85 L 205 105 L 95 105 Z" fill="url(#bodyGrad)" stroke="#6366f1" strokeWidth="1" />

                  {/* Chest (Pectorals) */}
                  <path 
                    d="M 110 102 Q 150 108 190 102 L 188 140 Q 150 148 112 140 Z" 
                    fill={activeFocus?.id === "pec-major" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "pec-major" ? "#ec4899" : "#4f46e5"}
                    strokeWidth={activeFocus?.id === "pec-major" ? "3" : "1.5"}
                    className="cursor-pointer transition-all hover:fill-purple-600/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "pec-major"))}
                  />

                  {/* Deltoids (Left & Right) */}
                  <path 
                    d="M 95 102 Q 80 120 90 145 L 108 115 Z" 
                    fill={activeFocus?.id?.startsWith("deltoid") ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#8b5cf6" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-pink-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "deltoid-ant"))}
                  />
                  <path 
                    d="M 205 102 Q 220 120 210 145 L 192 115 Z" 
                    fill={activeFocus?.id?.startsWith("deltoid") ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#8b5cf6" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-pink-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "deltoid-ant"))}
                  />

                  {/* Biceps & Arms */}
                  <path 
                    d="M 88 140 Q 75 180 82 210 L 98 200 Q 102 165 98 135 Z" 
                    fill={activeFocus?.id === "biceps" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#10b981" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-emerald-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "biceps"))}
                  />
                  <path 
                    d="M 212 140 Q 225 180 218 210 L 202 200 Q 198 165 202 135 Z" 
                    fill={activeFocus?.id === "biceps" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#10b981" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-emerald-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "biceps"))}
                  />

                  {/* Forearms */}
                  <path d="M 82 210 L 72 265 L 85 260 L 98 200 Z" fill={activeFocus?.id === "forearms" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#14b8a6" strokeWidth="1" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "forearms"))} className="cursor-pointer" />
                  <path d="M 218 210 L 228 265 L 215 260 L 202 200 Z" fill={activeFocus?.id === "forearms" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#14b8a6" strokeWidth="1" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "forearms"))} className="cursor-pointer" />

                  {/* Rectus Abdominis (Abs) */}
                  <path 
                    d="M 125 145 L 175 145 L 170 220 L 130 220 Z" 
                    fill={activeFocus?.id === "rectus-abs" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "rectus-abs" ? "#06b6d4" : "#0ea5e9"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-cyan-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "rectus-abs"))}
                  />

                  {/* Obliques */}
                  <path d="M 112 145 L 125 145 L 130 220 L 115 210 Z" fill={activeFocus?.id === "obliques" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#0ea5e9" strokeWidth="1" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "obliques"))} className="cursor-pointer" />
                  <path d="M 188 145 L 175 145 L 170 220 L 185 210 Z" fill={activeFocus?.id === "obliques" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#0ea5e9" strokeWidth="1" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "obliques"))} className="cursor-pointer" />

                  {/* Pelvis & Hips */}
                  <path d="M 115 210 L 185 210 L 175 250 L 125 250 Z" fill="url(#bodyGrad)" stroke="#4f46e5" strokeWidth="1" />

                  {/* Quadriceps (Left & Right Thighs) */}
                  <path 
                    d="M 120 250 Q 110 320 125 365 L 145 365 Q 150 310 145 250 Z" 
                    fill={activeFocus?.id === "quads" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "quads" ? "#10b981" : "#22c55e"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-emerald-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "quads"))}
                  />
                  <path 
                    d="M 180 250 Q 190 320 175 365 L 155 365 Q 150 310 155 250 Z" 
                    fill={activeFocus?.id === "quads" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "quads" ? "#10b981" : "#22c55e"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-emerald-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "quads"))}
                  />

                  {/* Knee Joints */}
                  <ellipse cx="135" cy="375" rx="10" ry="7" fill="url(#bodyGrad)" stroke="#4f46e5" />
                  <ellipse cx="165" cy="375" rx="10" ry="7" fill="url(#bodyGrad)" stroke="#4f46e5" />

                  {/* Tibialis Anterior & Lower Legs */}
                  <path 
                    d="M 126 385 Q 120 440 130 480 L 142 480 Q 145 435 142 385 Z" 
                    fill={activeFocus?.id === "tibialis" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#0ea5e9" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-cyan-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "tibialis"))}
                  />
                  <path 
                    d="M 174 385 Q 180 440 170 480 L 158 480 Q 155 435 158 385 Z" 
                    fill={activeFocus?.id === "tibialis" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#0ea5e9" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-cyan-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "tibialis"))}
                  />
                </g>
              ) : (
                // POSTERIOR (BACK) BODY PATHS
                <g className="transition-all duration-300">
                  {/* Head & Neck */}
                  <ellipse cx="150" cy="40" rx="20" ry="26" fill="url(#bodyGrad)" stroke="#4f46e5" strokeWidth="1.5" />

                  {/* Trapezius (Diamond Back) */}
                  <path 
                    d="M 150 64 L 185 85 L 150 160 L 115 85 Z" 
                    fill={activeFocus?.id === "traps" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "traps" ? "#a855f7" : "#8b5cf6"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-purple-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "traps"))}
                  />

                  {/* Posterior Deltoids */}
                  <path d="M 95 90 Q 80 115 90 140 L 112 110 Z" fill={activeFocus?.id === "deltoid-post" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#f43f5e" strokeWidth="1.5" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "deltoid-post"))} className="cursor-pointer" />
                  <path d="M 205 90 Q 220 115 210 140 L 188 110 Z" fill={activeFocus?.id === "deltoid-post" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} stroke="#f43f5e" strokeWidth="1.5" onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "deltoid-post"))} className="cursor-pointer" />

                  {/* Triceps (Back of arms) */}
                  <path 
                    d="M 88 135 Q 75 175 82 205 L 98 195 Q 102 160 98 130 Z" 
                    fill={activeFocus?.id === "triceps" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#3b82f6" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-blue-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "triceps"))}
                  />
                  <path 
                    d="M 212 135 Q 225 175 218 205 L 202 195 Q 198 160 202 135 Z" 
                    fill={activeFocus?.id === "triceps" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#3b82f6" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-blue-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "triceps"))}
                  />

                  {/* Latissimus Dorsi (Lats) */}
                  <path 
                    d="M 115 130 Q 150 150 185 130 L 170 210 Q 150 220 130 210 Z" 
                    fill={activeFocus?.id === "lats" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "lats" ? "#8b5cf6" : "#6366f1"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-purple-600/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "lats"))}
                  />

                  {/* Erector Spinae (Lower Back) */}
                  <path 
                    d="M 135 180 L 165 180 L 160 240 L 140 240 Z" 
                    fill={activeFocus?.id === "erector-spinae" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke="#f97316" 
                    strokeWidth="1.5"
                    className="cursor-pointer transition hover:fill-orange-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "erector-spinae"))}
                  />

                  {/* Gluteus Maximus (Glutes) */}
                  <path 
                    d="M 115 240 Q 105 295 145 295 Q 150 280 150 240 Z" 
                    fill={activeFocus?.id === "glute-max" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "glute-max" ? "#f43f5e" : "#fb7185"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-rose-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "glute-max"))}
                  />
                  <path 
                    d="M 185 240 Q 195 295 155 295 Q 150 280 150 240 Z" 
                    fill={activeFocus?.id === "glute-max" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "glute-max" ? "#f43f5e" : "#fb7185"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-rose-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "glute-max"))}
                  />

                  {/* Hamstrings (Back of Thighs) */}
                  <path 
                    d="M 120 295 Q 112 345 125 370 L 145 370 Q 150 335 145 295 Z" 
                    fill={activeFocus?.id === "hamstrings" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "hamstrings" ? "#8b5cf6" : "#a855f7"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-purple-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "hamstrings"))}
                  />
                  <path 
                    d="M 180 295 Q 188 345 175 370 L 155 370 Q 150 335 155 295 Z" 
                    fill={activeFocus?.id === "hamstrings" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "hamstrings" ? "#8b5cf6" : "#a855f7"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-purple-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "hamstrings"))}
                  />

                  {/* Calves (Gastrocnemius & Soleus) */}
                  <path 
                    d="M 122 385 Q 112 430 130 480 L 144 480 Q 148 425 144 385 Z" 
                    fill={activeFocus?.id === "calves" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "calves" ? "#06b6d4" : "#0ea5e9"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-cyan-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "calves"))}
                  />
                  <path 
                    d="M 178 385 Q 188 430 170 480 L 156 480 Q 152 425 156 385 Z" 
                    fill={activeFocus?.id === "calves" ? "url(#muscleHighlight)" : "url(#bodyGrad)"} 
                    stroke={activeFocus?.id === "calves" ? "#06b6d4" : "#0ea5e9"} 
                    strokeWidth="2"
                    className="cursor-pointer transition hover:fill-cyan-500/50"
                    onClick={() => setSelectedMuscle(MUSCLE_DATA.find(m => m.id === "calves"))}
                  />
                </g>
              )}
            </svg>

            {/* Interactive Pulse Hotspots on Top of Muscles */}
            {visibleHotspots.map((m) => {
              const isSelected = selectedMuscle?.id === m.id;
              const isHovered = hoveredMuscle?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMuscle(m)}
                  onMouseEnter={() => setHoveredMuscle(m)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  style={{ top: `${m.position.y}%`, left: `${m.position.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all ${
                    isSelected ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <span className="flex h-4 w-4 relative items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isSelected ? "bg-pink-400" : "bg-purple-400"
                    }`} />
                    <span className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white ${
                      isSelected ? "bg-pink-500" : isHovered ? "bg-purple-400" : "bg-indigo-600"
                    }`} />
                  </span>

                  {/* Tooltip on hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-lg bg-slate-950/90 text-white text-[10px] font-bold whitespace-nowrap pointer-events-none border border-slate-700 shadow-lg">
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls Bar */}
          <div className="w-full pt-3 mt-auto border-t border-[var(--border-main)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-purple-400" /> Click any muscle or hotspot to inspect biomechanics
            </span>
            <span className="text-[10px] font-semibold text-purple-400">
              {visibleHotspots.length} muscles mapped
            </span>
          </div>

        </div>

        {/* Anatomical Intelligence Card & Exercises (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          
          {selectedMuscle ? (
            <div className="fit-card p-6 rounded-3xl space-y-4 border border-purple-500/30">
              
              {/* Muscle Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800 uppercase">
                      {selectedMuscle.group} • {selectedMuscle.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{selectedMuscle.side}</span>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)]">
                    {selectedMuscle.name}
                  </h3>
                  <p className="text-xs font-mono italic text-[var(--text-secondary)]">
                    {selectedMuscle.latin}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>

              {/* Function */}
              <div className="p-3.5 rounded-2xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-xs">
                <p className="font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Biomechanical Function:
                </p>
                <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                  {selectedMuscle.function}
                </p>
              </div>

              {/* Exercises */}
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" /> Top Compound & Isolation Exercises:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedMuscle.exercises.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[var(--bg-card-nested)] border border-[var(--border-main)] text-xs text-[var(--text-primary)] font-semibold flex items-center justify-between"
                    >
                      <span className="truncate">{ex}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stretches & Recovery */}
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs">
                <p className="font-bold text-teal-400 mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Mobility & Recovery Note:
                </p>
                <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
                  {selectedMuscle.recoveryTip}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onSelectMuscleForWorkout) onSelectMuscleForWorkout(selectedMuscle);
                  alert(`Muscle ${selectedMuscle.name} selected! Target exercises: ${selectedMuscle.exercises.join(', ')}`);
                }}
                className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Dumbbell className="w-4 h-4" /> Program {selectedMuscle.name} into Workout
              </button>

            </div>
          ) : (
            <div className="fit-card p-10 text-center text-xs text-slate-400 rounded-3xl">
              Select any muscle group to view detailed anatomical biomechanics.
            </div>
          )}

          {/* Quick Muscle Selector Grid */}
          <div className="fit-card p-4 rounded-3xl">
            <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2">All Anatomical Muscles ({filteredMuscles.length})</h4>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredMuscles.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMuscle(m);
                    setViewSide(m.side);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition cursor-pointer ${
                    selectedMuscle?.id === m.id
                      ? "bg-purple-600 border-purple-400 text-white font-bold"
                      : "bg-[var(--bg-card-nested)] border-[var(--border-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
