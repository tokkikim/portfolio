import Link from "next/link";
import { cookies } from 'next/headers';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/MotionWrapper';
import ScrollOpacity from '@/components/ScrollOpacity';
import HeroSection from '@/components/HeroSection';
import CareerSection from '@/components/CareerSection';
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
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Projects</h2>
            </FadeIn>
            <StaggerContainer className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {data.projects.map((project: any, index: number) => {
                const isLocked = !isAdmin && index > 0; // Lock all except the first one for non-admins

                return (
                  <StaggerItem
                    key={project.id}
                    className="glass"
                    style={{
                      padding: '2rem',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      background: project.backgroundImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${project.backgroundImage})` : 'rgba(255, 255, 255, 0.03)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      filter: isLocked ? 'grayscale(30%)' : 'none', // Grayscale for locked items
                      pointerEvents: isLocked ? 'none' : 'auto', // Disable clicks
                    }}
                  >
                    {isLocked && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.05)',
                        backdropFilter: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
                        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Locked</span>
                      </div>
                    )}

                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: isLocked ? 0.5 : 1 }}>{project.title}</h3>
                    <p style={{ color: '#aaa', marginBottom: '1rem', opacity: isLocked ? 0.5 : 1 }}>{project.description}</p>
                    <Link href={project.link} style={{ color: 'var(--primary)', fontWeight: 'bold', opacity: isLocked ? 0.5 : 1 }}>Learn More &rarr;</Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
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
