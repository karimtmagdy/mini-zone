import React, { useState } from 'react';
import { usePageCompletion } from './usePageCompletion';
import { usePageHistory } from './usePageHistory';
import { 
  Activity, 
  RefreshCcw, 
  TrendingDown, 
  TrendingUp,
  Search,
  ChevronRight,
  ShieldAlert,
  Clock,
  Layout,
  Database,
  ShieldCheck,
  Loader2,
  XOctagon,
  MousePointer2,
  Accessibility
} from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

/** Returns tailwind color classes based on score thresholds */
const getScoreColor = (score: number) => {
  if (score > 80) return { text: 'text-emerald-500', bg: 'bg-emerald-500', indicator: '[&>[data-slot=progress-indicator]]:bg-emerald-500' };
  if (score > 50) return { text: 'text-orange-500', bg: 'bg-orange-500', indicator: '[&>[data-slot=progress-indicator]]:bg-orange-500' };
  return { text: 'text-red-500', bg: 'bg-red-500', indicator: '[&>[data-slot=progress-indicator]]:bg-red-500' };
};

const CATEGORY_META: Record<string, { icon: any; label: string }> = {
  ui: { icon: Layout, label: 'UI' },
  api: { icon: Database, label: 'API' },
  validation: { icon: ShieldCheck, label: 'Validation' },
  loading: { icon: Loader2, label: 'Loading' },
  error: { icon: XOctagon, label: 'Error' },
  interaction: { icon: MousePointer2, label: 'Interaction' },
  accessibility: { icon: Accessibility, label: 'A11y' },
};

export const PageCompletionOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { result, recalculate, lastScan } = usePageCompletion();
  const { history } = usePageHistory();

  if (!import.meta.env.DEV) return null;

  const score = result?.totalScore ?? 0;
  const colors = getScoreColor(score);
  const hasRegression = lastScan?.type === 'regression';

  return (
    <div className="fixed bottom-4 right-20 z-10000 font-sans antialiased text-sm">
      {/* Hover Card wraps the trigger button */}
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant={hasRegression ? "destructive" : "outline"}
            size="sm"
            className={cn(
              "h-10 rounded-full shadow-lg transition-all duration-300 active:scale-95 px-4 flex items-center gap-2",
              score === 100 && !hasRegression && "border-emerald-500/50 text-emerald-500"
            )}
          >
            <Activity className={cn("w-4 h-4", score === 100 && "animate-pulse")} />
            <span className={cn("font-bold tabular-nums", colors.text)}>{score}%</span>
            {hasRegression && lastScan && (
              <Badge variant="destructive" className="py-0 px-1 text-[9px] font-black h-4 rounded-md">
                <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                -{lastScan.diff}%
              </Badge>
            )}
          </Button>
        </HoverCardTrigger>

        {/* Hover preview — only show when the main panel is closed */}
        {!isOpen && result && (
          <HoverCardContent side="top" align="end" sideOffset={8} className="w-72 p-0 rounded-xl overflow-hidden border-border/60 shadow-xl">
            <div className="p-3 space-y-2.5">
              {/* Score header */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-muted-foreground/80 truncate max-w-[120px]">{result.path}</span>
                <div className="flex items-center gap-2">
                  {hasRegression && lastScan && (
                    <Badge variant="destructive" className="h-4 px-1.5 text-[9px] font-bold rounded-sm">
                      -{lastScan.diff}%
                    </Badge>
                  )}
                  <span className={cn("text-2xl font-black tabular-nums leading-none", colors.text)}>{score}%</span>
                </div>
              </div>

              {/* Dynamic color progress bar */}
              <Progress
                value={score}
                className={cn("h-2 bg-muted transition-all duration-500", colors.indicator)}
              />

              {/* Mini category grid */}
              <div className="grid grid-cols-4 gap-1">
                {(['ui', 'api', 'validation', 'interaction'] as const).map(key => {
                  const cat = result.categories[key];
                  const meta = CATEGORY_META[key];
                  const Icon = meta.icon;
                  return (
                    <div key={key} className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted/30">
                      <Icon className={cn(
                        "w-3 h-3",
                        cat.status === 'complete' ? 'text-emerald-500' :
                        cat.status === 'partial' ? 'text-orange-500' : 'text-muted-foreground/30'
                      )} />
                      <span className="text-[8px] font-black uppercase text-muted-foreground/60">{meta.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Persistent regression warning from lastScan */}
              {hasRegression && lastScan && (
                <div className="flex items-center gap-1.5 bg-destructive/10 rounded-md px-2 py-1 border border-destructive/20">
                  <ShieldAlert className="w-3 h-3 text-destructive shrink-0" />
                  <span className="text-[9px] font-bold text-destructive leading-tight">
                    Was {lastScan.previousScore}% — dropped {lastScan.diff}%
                  </span>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="bg-muted/40 px-3 py-1.5 border-t border-border/30">
              <p className="text-[9px] text-muted-foreground/80 text-center font-medium">Click to open full inspector</p>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>

      {/* Full Inspector Panel */}
      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-[380px] shadow-2xl border-border/60 bg-background/95 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-hidden rounded-2xl">
          <CardHeader className="p-3 pb-0 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black flex items-center gap-2 uppercase tracking-tight">
                  Inspector
                  {score === 100 && !hasRegression && <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-1.5 h-4 text-[9px]">Stable</Badge>}
                </CardTitle>
                <CardDescription className="text-[10px] font-mono truncate max-w-[240px] opacity-80">
                  {result?.path}
                </CardDescription>
              </div>
              <Button size="icon" variant="ghost" className="h-7 w-7 opacity-50 hover:opacity-100" onClick={recalculate}>
                <RefreshCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>

          {/* Persistent Last Scan Section */}
          {lastScan && lastScan.type !== 'stable' && (
            <div className="px-3 pt-2">
              <div className={cn(
                "rounded-xl p-2.5 border space-y-1.5",
                lastScan.type === 'regression'
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-emerald-500/5 border-emerald-500/20"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {lastScan.type === 'regression' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-tight",
                      lastScan.type === 'regression' ? "text-destructive" : "text-emerald-500"
                    )}>
                      {lastScan.type === 'regression' ? 'Regression Detected' : 'Improvement Detected'}
                    </span>
                  </div>
                  <Badge
                    variant={lastScan.type === 'regression' ? "destructive" : "outline"}
                    className={cn(
                      "h-4 px-1.5 text-[9px] font-black rounded-sm tabular-nums",
                      lastScan.type === 'improvement' && "text-emerald-500 border-emerald-500/30"
                    )}
                  >
                    {lastScan.type === 'regression' ? '-' : '+'}{lastScan.diff}%
                  </Badge>
                </div>
                {lastScan.previousScore !== undefined && (
                  <p className={cn(
                    "text-[9px] font-medium",
                    lastScan.type === 'regression' ? "text-destructive/70" : "text-emerald-500/70"
                  )}>
                    Previous score: {lastScan.previousScore}% → Current: {score}%
                  </p>
                )}
              </div>
            </div>
          )}

          <Tabs defaultValue="overview" className="w-full">
            <div className="px-3 pt-2">
              <TabsList className="grid w-full grid-cols-3 h-8 bg-muted/50 p-0.5 rounded-lg">
                <TabsTrigger value="overview" className="h-7 text-[10px] font-bold uppercase transition-all">Overview</TabsTrigger>
                <TabsTrigger value="details" className="h-7 text-[10px] font-bold uppercase transition-all">Details</TabsTrigger>
                <TabsTrigger value="history" className="h-7 text-[10px] font-bold uppercase transition-all">History</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="max-h-[420px] overflow-auto">
              {/* Overview Tab */}
              <TabsContent value="overview" className="p-3 pt-2 space-y-3 animate-in fade-in slide-in-from-right-1">
                <div className="bg-muted/30 p-3 rounded-xl border border-border/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-muted-foreground uppercase">Readiness</span>
                    <span className={cn("font-black text-xs tabular-nums", colors.text)}>
                      {score}%
                    </span>
                  </div>
                  <Progress value={score} className={cn("h-2 transition-all duration-700", colors.indicator)} />
                  
                  {hasRegression && lastScan && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-destructive shrink-0" />
                      <p className="text-[10px] font-bold text-destructive">
                        Regression: was {lastScan.previousScore}% (-{lastScan.diff}%)
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(['ui', 'api', 'validation', 'interaction'] as const).map(key => {
                    const cat = result?.categories[key];
                    const meta = CATEGORY_META[key];
                    return (
                      <CategorySimple
                        key={key}
                        icon={<meta.icon className={cn("w-3 h-3", cat?.status === 'complete' ? 'text-emerald-500' : cat?.status === 'partial' ? 'text-orange-500' : 'text-muted-foreground/40')} />}
                        label={meta.label}
                        status={cat?.status}
                      />
                    );
                  })}
                </div>

                <div className="bg-muted/20 rounded-xl p-3 border border-border/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-muted-foreground opacity-70 mb-1">
                    <Search className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase">Quick Audit</span>
                  </div>
                  <ul className="space-y-1">
                    {Object.values(result?.categories ?? {}).flatMap(c => c.details).slice(0, 2).map((d, i) => (
                      <li key={i} className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <ChevronRight className="w-2.5 h-2.5 text-emerald-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="p-3 pt-2 space-y-2 animate-in fade-in slide-in-from-right-1">
                {result && Object.entries(result.categories).map(([key, cat]) => (
                  <CategoryCompactItem key={key} name={key} {...cat} />
                ))}
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="p-3 pt-2 space-y-2 animate-in fade-in slide-in-from-right-1">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase">Route History</span>
                </div>
                {history.map((entry, idx) => {
                  const entryColor = getScoreColor(entry.score);
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/20 group hover:border-primary/20 transition-colors">
                      <div className="min-w-0 pr-2">
                        <p className="text-[11px] font-bold truncate tracking-tight">{entry.path}</p>
                        <p className="text-[9px] text-muted-foreground/70">{new Date(entry.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "text-[10px] h-5 tabular-nums scale-90 font-bold",
                        entryColor.text, `border-current/20`
                      )}>
                        {entry.score}%
                      </Badge>
                    </div>
                  );
                })}
                {history.length === 0 && <p className="text-[10px] text-center text-muted-foreground/70 py-4 italic">No history available</p>}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

const CategorySimple = ({ icon, label, status }: { icon: React.ReactNode, label: string, status?: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border/20">
    <div className="p-1.5 rounded-md bg-background shadow-sm">{icon}</div>
    <div className="leading-none overflow-hidden">
      <p className="text-[9px] font-black text-muted-foreground/80 uppercase tracking-tighter truncate">{label}</p>
      <p className={cn(
        "text-[10px] font-black mt-0.5 uppercase tracking-tight",
        status === 'complete' ? "text-emerald-500" : status === 'partial' ? "text-amber-500" : "text-muted-foreground/70"
      )}>
        {status ?? 'pend.'}
      </p>
    </div>
  </div>
);

const CategoryCompactItem = ({ name, score, maxScore, details, status }: { name: string, score: number, maxScore: number, details: string[], status: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const meta = CATEGORY_META[name];
  const Icon = meta?.icon || Activity;
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const barColor = getScoreColor(pct);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="rounded-xl border border-border/40 bg-card overflow-hidden">
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-3 w-full p-2 text-left hover:bg-muted/50 transition-colors">
          <div className={cn(
            "p-1.5 rounded-lg shrink-0",
            status === 'complete' ? "bg-emerald-500/10 text-emerald-500" :
            status === 'partial' ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"
          )}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold capitalize leading-none">{name}</span>
              <span className="text-[9px] font-mono text-muted-foreground/70">{score}/{maxScore}</span>
            </div>
            <Progress value={pct} className={cn("h-1 transition-all duration-500", barColor.indicator)} />
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3 pt-1 border-t border-border/20 space-y-1 bg-muted/10">
          {details.map((d, i) => (
            <div key={i} className="text-[10px] text-muted-foreground/80 flex items-start gap-1.5 leading-tight">
              <span className="w-1 h-1 rounded-full bg-border mt-1.5 shrink-0" />
              {d}
            </div>
          ))}
          {details.length === 0 && <p className="text-[9px] text-muted-foreground/70 italic">No features detected.</p>}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
