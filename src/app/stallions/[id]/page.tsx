import { notFound } from "next/navigation";
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

// TypeScript Interface for params
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StallionProfilePage({ params }: PageProps) {
  // ১. Next.js 14/15 এ params একটি Promise, তাই এটাকে await করতে হবে
  const { id } = await params;

  // ২. ডাটা ফেচ করা
  let stallion;
  try {
    const res = await fetch(`https://stallion-registry-back-end.vercel.app/stallions/${id}`, {
      cache: "no-store", // ডাটা ক্যাশ হবে না, প্রতিবার নতুন ডাটা আসবে
    });

    // যদি API থেকে ৪০০ বা ৫০০ এরর আসে
    if (!res.ok) {
      console.error("API Fetch Error:", res.statusText);
      return notFound();
    }

    stallion = await res.json();
  } catch (error) {
    console.error("Network Error:", error);
    return notFound();
  }

  // যদি API থেকে ডাটা না আসে বা নাল (null) হয়
  if (!stallion) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      {/* <SubscriptionLockNotice stallion={stallion} /> */}
      <ProfileHeader stallion={stallion} />
      <OverviewBlock stallion={stallion} />
      
      <hr className="border-t border-(--gold-soft)" />
      <BreedingDetails stallion={stallion} />
      
      <hr className="border-t border-(--gold-soft)" />
      <PedigreeBlock stallion={stallion} />
      
      <hr className="border-t border-(--gold-soft)" />
      <PerformanceTable records={stallion.performanceRows || []} />
      
      <BreedingStats stallion={stallion} />
      <NotableProgeny stallion={stallion} />
      <DisciplineCoverage stallion={stallion} />
      <PhotoGallery stallion={stallion} />
      <VideoReferences stallion={stallion} />
    </div>
  );
}