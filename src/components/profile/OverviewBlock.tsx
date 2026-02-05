import type { Stallion } from "@/types/stallion";
import Section from "./Section";

export default function OverviewBlock({ stallion }: { stallion: Stallion }) {
  return (
    <Section
      title="Overview"
      subtitle="Owner-submitted content. Presented for reference only."
    >
      <p className="text-sm leading-6 text-zinc-400">
        {stallion.overview || "No overview provided."}
      </p>
    </Section>
  );
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Section from "./Section";

// export default function OverviewBlock({ stallion }: { stallion: any }) {
//   // ডাটা মডেলে সরাসরি 'overview' নেই, তাই আমরা একটি ডিফল্ট টেক্সট তৈরি করতে পারি
//   // অথবা যদি ভবিষ্যতে 'overview' ফিল্ড যোগ করেন তবে সেটি দেখাবে।
//   const summary = stallion?.overview || 
//     `${stallion?.registeredName} is an ${stallion?.status || 'Active'} stallion standing in ${stallion?.countryOfStanding || 'Unknown Location'}. Born in ${stallion?.yearOfBirth || 'N/A'}.`;

//   return (
//     <Section
//       title="Overview"
//       subtitle="Owner-submitted content. Presented for reference only."
//     >
//       <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-5">
//         <p className="text-sm leading-relaxed text-zinc-400">
//           {stallion?.overview ? stallion.overview : summary}
//         </p>
        
//         {/* যদি রেজিস্ট্রেশন লিঙ্ক থাকে তবে এখানেও একটি রেফারেন্স দেওয়া যেতে পারে */}
//         {stallion?.officialRegistryLink && (
//            <div className="mt-4 pt-4 border-t border-zinc-800">
//               <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Documentation</p>
//               <a 
//                 href={stallion.officialRegistryLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xs text-[#b08d57] hover:text-[#d4af37] transition-colors inline-flex items-center gap-1"
//               >
//                 View Official Registry Record
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                 </svg>
//               </a>
//            </div>
//         )}
//       </div>
//     </Section>
//   );
// }