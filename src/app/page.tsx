import Link from "next/link";
import fs from 'fs/promises';
import path from 'path';

async function getData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="container">
      <section className="section" style={{ alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {data.hero.title}
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '2rem', color: '#ccc' }}>
          {data.hero.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/#projects" className="glass" style={{ padding: '1rem 2rem', fontWeight: 'bold', transition: 'all 0.3s' }}>
            View Projects
          </Link>
          <Link href="/admin" className="glass" style={{ padding: '1rem 2rem', fontWeight: 'bold', transition: 'all 0.3s', borderColor: 'var(--primary)' }}>
            Admin Portal
          </Link>
        </div>
      </section>

      <section id="projects" className="section">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {data.projects.map((project: any) => (
            <div key={project.id} className="glass" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: '#aaa', marginBottom: '1rem' }}>{project.description}</p>
              <Link href={project.link} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Learn More &rarr;</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
