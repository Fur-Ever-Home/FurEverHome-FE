import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';

export default function GhidulAdoptatorului() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f5ee' }}>
      <Header />
      <main style={{ flex: 1, padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', color: '#2e1e14', fontFamily: "'Libertinus Sans', Georgia, sans-serif" }}>
          Ghidul adoptatorului
        </h1>
        <p style={{ color: '#5c4e43', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Află tot ce trebuie să știi înainte și după ce adopți un animal de companie.
        </p>
      </main>
      <Footer />
      <FloatingBtn />
    </div>
  );
}