import {
  PartitionBar,
  PartitionBarSegment,
  PartitionBarSegmentTitle,
  PartitionBarSegmentValue
} from "../oxygen-ui/partition-bar";

export function PartitionBarSizeDemo() {
  return (
    <div className="space-y-6 w-full max-w-lg mx-auto">
      <PartitionBar size="sm" className="w-full">
        <PartitionBarSegment num={4}>
          <PartitionBarSegmentTitle>Small</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>40</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={6} variant="secondary">
          <PartitionBarSegmentTitle>Small</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>60</PartitionBarSegmentValue>
        </PartitionBarSegment>
      </PartitionBar>

      <PartitionBar size="md" className="w-full">
        <PartitionBarSegment num={4}>
          <PartitionBarSegmentTitle>Medium</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>40</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={6} variant="secondary">
          <PartitionBarSegmentTitle>Medium</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>60</PartitionBarSegmentValue>
        </PartitionBarSegment>
      </PartitionBar>

      <PartitionBar size="lg" className="w-full">
        <PartitionBarSegment num={4}>
          <PartitionBarSegmentTitle>Large</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>40</PartitionBarSegmentValue>
        </PartitionBarSegment>
        <PartitionBarSegment num={6} variant="secondary">
          <PartitionBarSegmentTitle>Large</PartitionBarSegmentTitle>
          <PartitionBarSegmentValue>60</PartitionBarSegmentValue>
        </PartitionBarSegment>
      </PartitionBar>
    </div>
  );
}
