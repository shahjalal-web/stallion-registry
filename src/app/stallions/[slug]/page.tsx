import { notFound } from "next/navigation";
import { stallions } from "../../../data/stallions";

import SubscriptionLockNotice from "../../../components/profile/SubscriptionLockNotice";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import OverviewBlock from "../../../components/profile/OverviewBlock";
import BreedingDetails from "../../../components/profile/BreedingDetails";
import PedigreeBlock from "../../../components/profile/PedigreeBlock";
import PerformanceTable from "../../../components/profile/PerformanceTable";
import BreedingStats from "../../../components/profile/BreedingStats";
import NotableProgeny from "../../../components/profile/NotableProgeny";
import DisciplineCoverage from "../../../components/profile/DisciplineCoverage";
import PhotoGallery from "../../../components/profile/PhotoGallery";
import VideoReferences from "../../../components/profile/VideoReferences";

export default async function StallionProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const stallion = stallions.find((s: { slug: string; }) => s.slug === slug);
  if (!stallion) return notFound();

  return (
    <div className="space-y-6">
      <SubscriptionLockNotice stallion={stallion} />
      <ProfileHeader stallion={stallion} />
      <OverviewBlock stallion={stallion} />
      <hr className="border-t border-(--gold-soft)" />
      <BreedingDetails stallion={stallion} />
      <hr className="border-t border-(--gold-soft)" />
      <PedigreeBlock stallion={stallion} />
      <hr className="border-t border-(--gold-soft)" />
      <PerformanceTable stallion={stallion} />
      <BreedingStats stallion={stallion} />
      <NotableProgeny stallion={stallion} />
      <DisciplineCoverage stallion={stallion} />
      <PhotoGallery stallion={stallion} />
      <VideoReferences stallion={stallion} />
    </div>
  );
}
