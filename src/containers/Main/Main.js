import './Main.css';
import Header from '../../components/Header/Header';
import BodyCard from '../../components/BodyCard/BodyCard';

function Main() {
  return (
    <div className="main__wrap">
      <Header />
      <div>
        <BodyCard />
      </div>
    </div>
  );
}

export default Main;
