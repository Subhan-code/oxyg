import {
  PartitionBar,
  PartitionBarSegment,
  PartitionBarSegmentTitle,
  PartitionBarSegmentValue,
} from "../oxygen-ui/partition-bar";

export function PartitionBarDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Basic — two segments
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 min-h-[120px] flex flex-col justify-center">
          <PartitionBar size="md">
            <PartitionBarSegment num={3}>
              <PartitionBarSegmentTitle>Apples</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>30%</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={7} variant="secondary">
              <PartitionBarSegmentTitle>Oranges</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>70%</PartitionBarSegmentValue>
            </PartitionBarSegment>
          </PartitionBar>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Storage usage — four segments, lg
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 min-h-[140px] flex flex-col justify-center">
          <PartitionBar size="lg" gap={2}>
            <PartitionBarSegment num={42} alignment="left">
              <PartitionBarSegmentTitle>Photos</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>42 GB</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={28} variant="secondary" alignment="left">
              <PartitionBarSegmentTitle>Videos</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>28 GB</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={18} variant="muted" alignment="left">
              <PartitionBarSegmentTitle>Apps</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>18 GB</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={12} variant="outline" alignment="left">
              <PartitionBarSegmentTitle>Other</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>12 GB</PartitionBarSegmentValue>
            </PartitionBarSegment>
          </PartitionBar>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Budget allocation — sm, centered labels
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 min-h-[120px] flex flex-col justify-center">
          <PartitionBar size="sm">
            <PartitionBarSegment num={50} alignment="center">
              <PartitionBarSegmentTitle>R&D</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>50%</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={30} variant="secondary" alignment="center">
              <PartitionBarSegmentTitle>Marketing</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>30%</PartitionBarSegmentValue>
            </PartitionBarSegment>
            <PartitionBarSegment num={20} variant="muted" alignment="center">
              <PartitionBarSegmentTitle>Ops</PartitionBarSegmentTitle>
              <PartitionBarSegmentValue>20%</PartitionBarSegmentValue>
            </PartitionBarSegment>
          </PartitionBar>
        </div>
      </div>
    </div>
  );
}

export default PartitionBarDemo;
