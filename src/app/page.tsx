import Link from "next/link";
import { cookies } from 'next/headers';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/MotionWrapper';
import ScrollOpacity from '@/components/ScrollOpacity';
import HeroSection from '@/components/HeroSection';
import CareerSection from '@/components/CareerSection';
import ProjectList from '@/components/ProjectList';
import ContactSection from '@/components/ContactSection';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const revalidate = 0; // Disable static caching for real-time updates

async function getData() {
  try {
    const docRef = doc(db, "portfolio", "main");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return { hero: {}, projects: [], career: [] };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { hero: {}, projects: [], career: [] };
  }
}

export default async function Home() {
  const data = await getData();

  // Check for admin session
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session')?.value === 'true';

  return (
    <main>
      {/* Hero Section: Fixed Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' // Allow clicks to pass through to background if needed, but mainly to prevent blocking scroll interaction if z-index issues arise
      }}>
        <div className="container" style={{ pointerEvents: 'auto' }}>
          <ScrollOpacity>
            <HeroSection data={data.hero} />
          </ScrollOpacity>
        </div>
      </div>

      {/* Content Sections: Overlays the Hero */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginTop: '100vh',
        backgroundColor: 'rgba(10, 10, 10, 0.95)', // Darker background for content
        borderTop: '1px solid var(--glass-border)',
        boxShadow: '0 -10px 50px rgba(0,0,0,0.5)',
        minHeight: '100vh'
      }}>
        <div className="container">
          {/* Projects Section */}
          <section id="projects" className="section">
            <FadeIn>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'left' }}>Featured Projects</h2>
            </FadeIn>
            <ProjectList projects={data.projects} isAdmin={isAdmin} />
          </section>

          {/* Career Section */}
          <CareerSection data={data.career} />

          {/* Contact Section */}
          <ContactSection />

        </div>
      </div>
    </main>
  );
}
