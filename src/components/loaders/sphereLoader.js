import './sphereLoader.css';

// const SphereLoader = () => (
//   <div className="main-content side-content pt-0 jumps-prevent">
//     <div className="dimmer active">
//       <div className="spinner1">
//         <div className="double-bounce1" />
//         <div className="double-bounce2" />
//       </div>
//     </div>
//   </div>
// );

export const SphereLoader = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  )
};

export default SphereLoader;
