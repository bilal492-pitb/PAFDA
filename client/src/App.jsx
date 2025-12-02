import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Agriculture from './pages/Agriculture.jsx';
import Contact from './pages/Contact.jsx';
import Drug from './pages/Drug.jsx';
import Food from './pages/Food.jsx';
import News from './pages/News.jsx';
import NewsDetail from './pages/NewsDetail.jsx';
import UsefulTools from './pages/UsefulTools.jsx';
import NotFound from './pages/not-found.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Videos from './pages/Videos.jsx';
import Careers from './pages/Careers.jsx';
import Pafdaboard from './pages/Pafdaboard.jsx';
import Pafdaact from './pages/Pafdaact.jsx';
import PAFDAcorteam from './pages/PAFDAcorteam.jsx';
import NeedofPafda from './pages/NeedofPafda.jsx';
import Overview from './pages/Overview.jsx';
import OurDG from './pages/OurDG.jsx';
import NotificationPopup from './components/NotificationPopup.jsx';
function App() {
  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/agriculture" component={Agriculture} />
        <Route path="/contact" component={Contact} />
        <Route path="/drug" component={Drug} />
        <Route path="/food" component={Food} />
        <Route path="/news" component={News} />
        <Route path="/news/:slug" component={NewsDetail} />
        <Route path="/tools" component={UsefulTools} />
       <Route path="/videos" component={Videos} />
        <Route path="/careers" component={Careers} />
        <Route path="/Pafdaboard" component={Pafdaboard} />
        <Route path="/Pafdaact" component={Pafdaact} />
        <Route path="/PAFDAcorteam" component={PAFDAcorteam} />
        <Route path="/NeedofPafda" component={NeedofPafda} />
        <Route path="/Overview" component={Overview} />
        <Route path="/OurDG" component={OurDG} />
        <Route><NotFound /></Route>
      </Switch>
      <footer className="mt-auto">
        <Footer />
      </footer>
      <NotificationPopup />
    </div>
  );
}

export default App;