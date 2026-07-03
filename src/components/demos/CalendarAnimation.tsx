import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Check, ChevronDown, Plus, Calendar, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Category = 'Home' | 'Work' | 'Family';
type ViewState = 'calendar' | 'collapsed' | 'guests';

interface Task {
  id: string;
  title: string;
  time: string;
  date: string; // YYYY-MM-DD
  category: Category;
  completed: boolean;
}

interface Guest {
  id: string;
  name: string;
  role: 'Can view' | 'Can edit';
  avatar: string;
  color: string;
}

const toYYYYMMDD = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateInitialTasks = (): Task[] => {
  const tasks: Task[] = [];
  const today = new Date();
  
  const templates = {
    Home: ['Do laundry', 'Clean kitchen', 'Buy groceries', 'Water plants', 'Pay bills', 'Walk the dog'],
    Work: ['Update components', 'Fix layout bugs', 'Write blog post', 'Team meeting', 'Review PRs', 'Client call'],
    Family: ['Call mom', 'Pick up kids', 'Family dinner', 'Movie night', 'Plan vacation', 'Help with homework']
  };

  for (let i = -14; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = toYYYYMMDD(d);
    
    (['Home', 'Work', 'Family'] as Category[]).forEach(category => {
      const numTasks = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...templates[category]].sort(() => 0.5 - Math.random());
      
      for (let j = 0; j < numTasks; j++) {
        tasks.push({
          id: `${dateStr}-${category}-${j}`,
          title: shuffled[j],
          time: `${9 + j + Math.floor(Math.random() * 3)}:00 AM`,
          date: dateStr,
          category,
          completed: Math.random() > 0.7
        });
      }
    });
  }
  return tasks;
};

const guests: Guest[] = [
  { id: '1', name: 'John tony', role: 'Can view', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', color: '#ffecc0' },
  { id: '2', name: 'James imade', role: 'Can view', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', color: '#c0d5ff' },
  { id: '3', name: 'Johnson eve', role: 'Can view', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', color: '#c0eaff' },
  { id: '4', name: 'Tima sbdhs', role: 'Can edit', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80', color: '#cac0ff' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarAnimation() {
  const [viewState, setViewState] = useState<ViewState>('calendar');
  const [selectedTab, setSelectedTab] = useState<Category>('Home');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCopied, setIsCopied] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTimeId, setEditingTaskTimeId] = useState<string | null>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  
  // Start the 5-day view 2 days before the selected date to center it initially
  const [viewStartDate, setViewStartDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    return d;
  });

  const [tasks, setTasks] = useState<Task[]>(generateInitialTasks);

  const visibleDays = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(viewStartDate);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [viewStartDate]);

  const middleDay = visibleDays[2];
  const monthYear = middleDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrev = () => {
    const newDate = new Date(viewStartDate);
    newDate.setDate(newDate.getDate() - 5);
    setViewStartDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(viewStartDate);
    newDate.setDate(newDate.getDate() + 5);
    setViewStartDate(newDate);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(viewStartDate);
    newDate.setMonth(monthIndex);
    setViewStartDate(newDate);
    setIsMonthDropdownOpen(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  const updateTaskTime = (id: string, newTime: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, time: newTime } : t));
  };

  const addTask = (dateOverride?: Date) => {
    const targetDate = dateOverride || selectedDate;
    const newId = Math.random().toString(36).substring(2, 9);
    const newTask: Task = {
      id: newId,
      title: '',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      date: toYYYYMMDD(targetDate),
      category: selectedTab,
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    setEditingTaskId(newId);
    if (dateOverride) {
      setSelectedDate(dateOverride);
    }
  };

  const handleShare = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredTasks = useMemo(() => {
    const dateStr = toYYYYMMDD(selectedDate);
    return tasks.filter(t => t.date === dateStr && t.category === selectedTab);
  }, [tasks, selectedDate, selectedTab]);

  const formatTaskTime = (task: Task) => {
    if (viewState === 'calendar') return task.time;
    const isToday = task.date === toYYYYMMDD(new Date());
    if (isToday) return `Today, ${task.time.replace(' ', '')}`;
    
    const taskDate = new Date(task.date);
    return `${taskDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${task.time.replace(' ', '')}`;
  };

  return (
    <div className="w-[358px] select-none text-left">
      <motion.div 
        layout
        className={`flex flex-col overflow-hidden rounded-[24px] w-full bg-[#f7f7f7] dark:bg-zinc-900 border border-black/5 dark:border-white/5 ${
          viewState === 'calendar' ? 'gap-1 p-1' : 'gap-3 pt-3 px-1 pb-1'
        }`}
      >
        
        {/* Collapsed Header / Guests Header */}
        <AnimatePresence mode="popLayout" initial={false}>
          {viewState !== 'calendar' && (
            <motion.div 
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between shrink-0 w-full px-2.5"
            >
              <p className="font-medium text-[13px] leading-[20px] tracking-[-0.078px] text-zinc-400 dark:text-zinc-500 select-none">
                {viewState === 'guests' ? 'Guests' : (toYYYYMMDD(selectedDate) === toYYYYMMDD(new Date()) 
                  ? 'Today' 
                  : selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))}
              </p>
              <div className="flex items-center gap-2">
                {viewState === 'collapsed' ? (
                  <>
                    <button 
                      onClick={() => addTask(new Date())}
                      className="flex items-center justify-center outline-none rounded-[4px] text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                      title="Add task to Today"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setViewState('calendar')}
                      className="flex items-center justify-center outline-none rounded-[4px] text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setViewState('guests')}
                      className="flex items-start select-none outline-none pr-1"
                    >
                      {guests.slice(0, 4).map((guest, i) => (
                        <div 
                          key={guest.id}
                          className="relative rounded-full border-2 border-[#f7f7f7] dark:border-zinc-900 shrink-0 overflow-hidden w-5 h-5"
                          style={{ 
                            backgroundColor: guest.color,
                            marginLeft: i > 0 ? '-4px' : '0',
                            zIndex: 4 - i 
                          }}
                        >
                          <img src={guest.avatar} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="relative rounded-full border-2 border-[#f7f7f7] dark:border-zinc-900 shrink-0 flex items-center justify-center overflow-hidden w-5 h-5 bg-[#f7f7f7] dark:bg-zinc-800 -ml-1 z-[0]">
                        <span className="font-sans text-[9px] font-semibold leading-[12px] tracking-[0.22px] text-zinc-500 dark:text-zinc-400 uppercase tabular-nums">+9</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setViewState('collapsed')}
                    className="relative flex items-center justify-center overflow-hidden rounded-[4px] outline-none w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar Section */}
        <AnimatePresence mode="popLayout" initial={false}>
          {viewState === 'calendar' && (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex flex-col gap-2 p-3 shrink-0 w-full bg-white dark:bg-zinc-950 rounded-t-[20px] rounded-b-[16px] shadow-sm border border-transparent dark:border-zinc-800/80"
            >
              <div className="flex items-center justify-between shrink-0 w-full relative z-20">
                <div 
                  className="flex items-center gap-1 select-none cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 px-2 py-1 -ml-2 rounded-md transition-colors"
                  onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                >
                  <p className="font-semibold text-[14px] leading-[20px] tracking-[-0.084px] text-zinc-700 dark:text-zinc-350">
                    {monthYear}
                  </p>
                  <motion.div animate={{ rotate: isMonthDropdownOpen ? 180 : 0 }}>
                    <ChevronDown className="w-4 h-4 text-zinc-600 dark:text-zinc-450" />
                  </motion.div>
                </div>
                <button 
                  onClick={() => setViewState('collapsed')}
                  className="relative flex items-center justify-center overflow-hidden rounded-[4px] outline-none w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
                <AnimatePresence>
                  {isMonthDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-0 left-0 right-0 bg-white dark:bg-zinc-950 z-30 grid grid-cols-4 gap-1.5 p-2 border border-zinc-100 dark:border-zinc-850 rounded-xl shadow-lg"
                    >
                      {months.map((m, i) => (
                        <button
                          key={m}
                          onClick={() => handleMonthSelect(i)}
                          className={`py-2 text-[13px] rounded-lg transition-colors ${
                            viewStartDate.getMonth() === i 
                              ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-medium shadow-sm' 
                              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                          }`}
                        >
                          {m.substring(0, 3)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2 shrink-0 w-full mt-1">
                  <button 
                    onClick={handlePrev}
                    className="flex items-center justify-center overflow-hidden rounded-[6px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex flex-1 overflow-hidden relative">
                    <div className="flex flex-1 items-center gap-1">
                      {visibleDays.map((d) => {
                        const isSelected = toYYYYMMDD(d) === toYYYYMMDD(selectedDate);
                        return (
                          <button
                            key={d.toISOString()}
                            onClick={() => setSelectedDate(d)}
                            className="relative flex flex-1 flex-col items-center overflow-hidden px-1 py-2 rounded-lg bg-transparent"
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="selectedDay"
                                className="absolute inset-0 rounded-lg bg-zinc-900 dark:bg-zinc-800 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.16)]"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className={`relative font-normal text-[11px] leading-[16px] w-full text-center pointer-events-none transition-colors duration-150 ${isSelected ? 'text-white' : 'text-zinc-500 dark:text-zinc-400'}`}>
                              {d.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className={`relative font-medium text-[15px] leading-[24px] tracking-[-0.176px] w-full text-center pointer-events-none transition-colors duration-150 ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {d.toLocaleDateString('en-US', { day: '2-digit' })}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="flex items-center justify-center overflow-hidden rounded-[6px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tasks Section */}
        <AnimatePresence mode="popLayout" initial={false}>
          {viewState !== 'guests' && (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col shrink-0 w-full overflow-hidden relative ${
                viewState === 'calendar' 
                  ? 'gap-2 rounded-[16px] py-2 bg-zinc-200/50 dark:bg-zinc-800/40 min-h-[120px]' 
                  : 'gap-2 px-3 py-3 rounded-t-[16px] rounded-b-[20px] bg-white dark:bg-zinc-950 border border-transparent dark:border-zinc-800/80 shadow-sm'
              }`}
            >
              {viewState === 'calendar' && (
                <motion.div layout="position" className="flex items-center justify-between px-[12px]">
                  <p className="font-semibold text-[13px] leading-[20px] tracking-[-0.078px] text-zinc-400 dark:text-zinc-500 select-none">
                    Tasks
                  </p>
                  <button 
                    onClick={() => addTask()}
                    className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors outline-none rounded-sm"
                    aria-label="Add task"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
              
              <motion.div layout="position" className="flex flex-col gap-3 w-full">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center py-4"
                    >
                      <p className="text-[13px] text-zinc-400 dark:text-zinc-500">No tasks for this day.</p>
                    </motion.div>
                  ) : (
                    filteredTasks.map((task) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={task.id} 
                        className={`flex items-center justify-between w-full cursor-pointer group ${viewState === 'calendar' ? 'px-[8px]' : 'px-[2px]'}`} 
                        onClick={() => toggleTask(task.id)}
                      >
                        <div className="flex items-center gap-[8px] flex-1 min-w-0">
                          <div className="relative shrink-0 w-5 h-5 flex items-center justify-center">
                            <div className={`absolute inset-[10%] rounded-[4px] transition-colors duration-120 ${
                              task.completed 
                                ? 'bg-green-500 dark:bg-green-600' 
                                : (viewState === 'calendar' ? 'bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600' : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700')}`} 
                            />
                            <AnimatePresence>
                              {task.completed && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div 
                            className="flex items-center gap-[4px] flex-1 min-w-0 relative"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTaskId(task.id);
                            }}
                          >
                            {editingTaskId === task.id ? (
                              <input
                                autoFocus
                                value={task.title}
                                onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                                onBlur={() => {
                                  setEditingTaskId(null);
                                  if (!task.title.trim()) {
                                    setTasks(prev => prev.filter(t => t.id !== task.id));
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    setEditingTaskId(null);
                                    if (!task.title.trim()) {
                                      setTasks(prev => prev.filter(t => t.id !== task.id));
                                    }
                                  }
                                }}
                                className={`font-semibold text-[13px] leading-[20px] tracking-[-0.084px] w-full bg-transparent outline-none rounded px-1 -ml-1 ${task.completed ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}
                                placeholder="Task title..."
                              />
                            ) : (
                              <>
                                <p className={`font-semibold text-[13px] leading-[20px] tracking-[-0.084px] whitespace-nowrap overflow-hidden text-ellipsis shrink-0 select-none transition-colors ${task.completed ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                  {task.title || 'New Task'}
                                </p>
                                {task.completed && (
                                  <motion.div 
                                    layoutId={`strikethrough-${task.id}`}
                                    className="absolute top-1/2 left-0 right-0 h-[1.2px] bg-zinc-450 dark:bg-zinc-550 origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div 
                          className="flex items-center justify-center px-[6px] py-[2px] rounded-[6px] shrink-0 bg-zinc-100 dark:bg-zinc-900 ml-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTaskTimeId(task.id);
                          }}
                        >
                          {editingTaskTimeId === task.id ? (
                            <input
                              autoFocus
                              value={task.time}
                              onChange={(e) => updateTaskTime(task.id, e.target.value)}
                              onBlur={() => setEditingTaskTimeId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') setEditingTaskTimeId(null);
                              }}
                              className="font-medium text-[11px] leading-[20px] tracking-[-0.078px] text-zinc-800 dark:text-zinc-200 bg-transparent outline-none w-[65px] text-center tabular-nums"
                            />
                          ) : (
                            <p className="font-semibold text-[11px] leading-[20px] tracking-[-0.078px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap tabular-nums">
                              {formatTaskTime(task)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guests Section */}
        <AnimatePresence mode="popLayout" initial={false}>
          {viewState === 'guests' && (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative flex flex-col gap-3 p-3 shrink-0 w-full overflow-hidden bg-white dark:bg-zinc-950 border border-transparent dark:border-zinc-800 rounded-t-[16px] rounded-b-[20px] shadow-sm"
            >
              <div className="flex flex-col gap-3 w-full">
                {guests.map((guest) => (
                  <div key={guest.id} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div 
                        className="relative rounded-full border border-zinc-100 dark:border-zinc-800 shrink-0 overflow-hidden w-5 h-5"
                        style={{ backgroundColor: guest.color }}
                      >
                        <img src={guest.avatar} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <p className="font-semibold text-[13px] leading-[20px] tracking-[-0.084px] text-zinc-800 dark:text-zinc-200 whitespace-nowrap select-none">
                        {guest.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 cursor-pointer group">
                      <p className="font-semibold text-[12px] leading-[20px] tracking-[-0.078px] text-zinc-500 dark:text-zinc-450 whitespace-nowrap select-none group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">
                        {guest.role}
                      </p>
                      <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleShare}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-[10px] outline-none p-2 mt-1 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-medium flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.div
                      key="copied"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                      <p className="font-semibold text-[13px] leading-[20px] tracking-[-0.084px] text-white select-none">
                        Copied!
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="share"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5"
                    >
                      <Link className="w-3.5 h-3.5 text-white" />
                      <p className="font-semibold text-[13px] leading-[20px] tracking-[-0.084px] text-white select-none">
                        Share link
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Nav Section */}
        <AnimatePresence mode="popLayout" initial={false}>
          {viewState === 'calendar' && (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex shrink-0 w-full rounded-full p-1 bg-zinc-200/50 dark:bg-zinc-800/40 min-h-[44px]"
            >
              {(['Home', 'Work', 'Family'] as Category[]).map((tab) => {
                const isSelected = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className="relative flex flex-1 items-center justify-center rounded-full outline-none py-2"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="selectedTab"
                        className="absolute inset-0 rounded-full bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800/40 shadow-sm"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className={`relative font-semibold text-[13px] leading-[20px] tracking-[-0.084px] text-center select-none transition-colors duration-180 ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}`}>
                      {tab}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
