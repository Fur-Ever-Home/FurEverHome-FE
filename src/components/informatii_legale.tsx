import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingBtn from '../components/floating-btn';
import './informatii_legae.css';

export default function InformatiiLegale() {
  return (
    <div className="page-container">
      <Header />

      <div className="content-wrapper">
        {/* Navigarea din stânga - Cuprins */}
        <aside className="sidebar-cuprins">
          <h3>Cuprins</h3>
          <ul className="cuprins-list">
            <li>
              <Link to="/informatii-legale" className="active-link">
                Informații legale
              </Link>
            </li>
            <li>
              <Link to="/politica-confidentialitate">
                Politica de confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/politica-cookies">
                Politica de cookies
              </Link>
            </li>
            <li>
              <Link to="/gdpr">
                GDPR – drepturile tale
              </Link>
            </li>
          </ul>
        </aside>

        {/* Conținutul din mijloc actualizat */}
        <main className="main-content">
          <p className="breadcrumb">Acasă › Informații legale</p>
          <h1>Informații legale</h1>
          <span className="subtitle">Ultima actualizare: 3 noiembrie 2026</span>

          <p className="intro-text">
            Bun venit pe FurEverHome! Prezentul document stabilește regulile și condițiile de utilizare a platformei FurEverHome, o soluție digitală dedicată facilitării adopțiilor de animale de companie în Iași și împrejurimi. Prin crearea unui cont sau utilizarea platformei, ești de acord cu acești termeni.
          </p>

          <section id="scopul-platformei">
            <h2>1. Scopul Platformei</h2>
            <p>
              FurEverHome acționează ca un intermediar digital (platformă de matchmaking și management) între potențialii adoptatori și centrele de adopție/adăposturile partenere. FurEverHome nu este proprietarul animalelor listate și nu este parte directă în contractul fizic de adopție semnat la sediul adăpostului.
            </p>
          </section>

          <section id="tipuri-utilizatori">
            <h2>2. Tipuri de Utilizatori și Obligații</h2>
            <ul>
              <li>
                <strong>Adoptatorii:</strong> Se obligă să furnizeze date reale în Chestionarul de Compatibilitate, să respecte programările făcute prin intermediul calendarului integrat și să acționeze cu bună-credință față de animale și voluntarii centrelor.
              </li>
              <li>
                <strong>Centrele de Adopție:</strong> Se obligă să mențină actualizat statusul animalelor (Disponibil/Rezervat/Adoptat) pentru a evita dezinformarea utilizatorilor și să proceseze cererile de vizită într-un timp rezonabil.
              </li>
            </ul>
          </section>

          <section id="reguli-adoptie">
            <h2>3. Reguli privind Adopția și Rezervările</h2>
            <p>
              Aprobarea unei cereri de vizionare în platformă nu garantează adopția finală. Decizia finală de a da un animal spre adopție aparține exclusiv centrului, în urma interacțiunii fizice și a evaluării la fața locului. Limitarea la 5 vizite active per animal este impusă pentru a proteja bunăstarea animalelor.
            </p>
          </section>

          <section id="politica-anti-abuz">
            <h2>4. Politica anti-abuz (Limitarea adopțiilor)</h2>
            <p>
              Pentru a descuraja traficul de animale și a garanta siguranța acestora, platforma impune o limită strictă. Un utilizator (identificat prin cont, date de contact sau identitate fizică la centru) poate finaliza un număr maxim de 3 adopții într-un interval de 30 de zile calendaristice.
            </p>
            <p>
              Orice încercare de eludare a acestei reguli, inclusiv prin crearea de conturi multiple, va atrage suspendarea permanentă a accesului pe platformă și raportarea către autoritățile competente.
            </p>
          </section>

          <section id="plati-donatii">
            <h2>5. Plăți și Donații (Split Routing)</h2>
            <p>
              Donațiile și taxele de adopție procesate prin platformă sunt securizate. În cazul plăților online, platforma FurEverHome reține automat o taxă fixă/comision procentual pentru acoperirea costurilor tehnice și de mentenanță, restul sumei fiind transferat direct în contul centrului de adopție vizat. Sumele donate nu sunt rambursabile.
            </p>
          </section>

          <section id="limitarea-raspunderii">
            <h2>6. Limitarea Răspunderii</h2>
            <p>
              Platforma nu își asumă răspunderea pentru problemele de sănătate ale animalelor nedezvăluite de centre sau pentru incidentele apărute post-adopție. Toate detaliile medicale afișate sunt responsabilitatea exclusivă a adăpostului care a publicat anunțul.
            </p>
          </section>

          {/* Caseta de contact de la final */}
          <div className="contact-card">
            <h4>Ai întrebări?</h4>
            <p>
              Scrie-ne la <a href="mailto:contact@fureverhome.ro">contact@fureverhome.ro</a> și îți răspundem cât mai repede.
            </p>
          </div>
        </main>
      </div>

      <FloatingBtn />
      <Footer />
    </div>
  );
}