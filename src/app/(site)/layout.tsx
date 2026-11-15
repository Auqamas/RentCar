import { cookies } from "next/headers";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntroLoader } from "@/components/IntroLoader";
import { PageFade } from "@/components/PageFade";
import { SiteTracker } from "@/components/SiteTracker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getCustomerSession } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([getCustomerSession(), cookies()]);
  const showIntro = cookieStore.get("ab_intro")?.value !== "1";

  return (
    <div className="min-h-full flex flex-col">
      <IntroLoader initialShow={showIntro} />
      <SiteTracker />
      <Header userName={session?.name ?? null} />
      <main className="flex-1">
        <PageFade>{children}</PageFade>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
