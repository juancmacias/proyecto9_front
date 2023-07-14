//import AFRAME from'aframe';

import { Entity, Scene } from 'aframe-react';
import useSound from 'use-sound';
import React, {useState, useEffect, useRef} from 'react';

import Login from './login';


function Frame() {
  const [ sesion, setSesion] = useState(localStorage.getItem('registro'));
  const [ mensaje, setMensaje] = useState('');
  const [ log, setlog] = useState('');
  const soundUrl = '../resources/fx_teleport.mp3';
  const soundUrlP = '../resources/pato.mp3';
  const [play, { stop, isPlaying }] = useSound(soundUrl, { volume: 0.25 });
  const [playP, { stopP, isPato }] = useSound(soundUrlP);
  const [camara, setCamara] = useState('14.464 1.572 -5.571');
  const isCheck = useRef(false);
  const [datos, setDatos] = useState([])


  const llamada = ()  => {


    fetch('http://127.0.0.1:8000/personales', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {

        console.log('Respuesta:', data);
        setDatos(data);
    })
    .catch((error) => {
        console.error('Error en el con el token:', error);
        // Manejar el error de la API
    })

}
  useEffect(()=> {
      llamada();

      
  }, [])

    const _handleClick = (cli) => {
      setMensaje('');
      console.log("Click en algo " + cli);
      isCheck.current = true;
      switch (cli) {
        case 'puertas': setCamara('10, 1.52, -12');
        break;
        case 'puerta': setCamara('1.464, 1.572, 2.571');
        break;
        case 'letras': setCamara('1.464, 42.572, 26.571');
        break;

        case 'letras-dos': setCamara('1.464, 62.572, -48.571');
        break;
        case 'nivel2-display': setCamara('1.464, 1.572, 2.571');
        break;
        default:
        console.log("salto, salto")
        break;
      }
     
        play()
        
        console.log("posicion camara " + camara);
        isCheck.current = false;

      }
      const _pregunta = () => {
        setlog('');
        setMensaje('');
        playP()
        console.log("Hemos hecho click en el patito" + sesion)
        switch (sesion) {
          case 'ROLE_ADMIN':
            setMensaje(  
                <Entity
                      static-body
                      primitive="a-entity"
                      position={{ x: -36, y: 10, z: 44} }
                  rotation="0 134 0"
                      geometry="primitive: box; height: 3; width: 17;depth:0"
                      material="shader: flat; color: black"
                      text={"value: Hola Administrado, ¿Que quieres preguntarme?;width: 16;letterSpacing:10px;yOffset:25;color:#FFFAF0"}
                  />)
              break;

          case 'ROLE_USER':
            setMensaje(
                <Entity
                      static-body
                      primitive="a-entity"
                      position={{ x: -36, y: 10, z: 44} }
                      rotation="0 134 0"
                      geometry="primitive: box; height:3; width: 16;depth:0"
                      material="shader: flat; "
                      text={"value: Hola usuario, ¿Que quieres preguntarme?;width:16;letterSpacing:10px;yOffset:25;color:#FFFAF0"}
                  />)
              break;
          default:
            
            setMensaje(
              <Entity
                  primitive="a-entity"
                  reset="true"
                  position={{ x: -36, y: 10, z: 44} }
                  rotation="0 134 0"
                  geometry="primitive: box; height: 4; width: 16; depth:0"
                  material="shader: flat; color: black"
                  events={{
                    click: ()=> _registrarse('') ,
                  }}
                  text={"value:¿Si quieres consultarme?\n Tienes que estar registrado para usar mis servicios\n click aquí para registrarte o logarte;width: 16;letterSpacing:10px;yOffset:25;color:#FFFAF0"} 
              />);
            break;
      }
      }
      const _registrarse = () =>{
        setlog(
          <Login/>
        )
          
      }
   const slogan = (
    datos.definicionCorta

   )
   const enlaces = (enlace) =>{
      window.open(enlace, "_blank")
   }


      return (
        <Scene debug="false" physics="debug: false" canvas="" inspector="" keyboard-shortcuts="" screenshot="" vr-mode-ui="" auto-enter-vr="">
          {log}
          
          <a-assets>
            <img id="ghost" src="https://ucarecdn.com/f6bf9fe3-82b4-43ba-b5b6-a7e308b64c77/" alt='' crossorigin="anonymous" />
            <audio id="bg_music" src="resources/bg_music.mp3" preload="auto"></audio>
            <audio id="fx_punch" src="resources/fx_punch.mp3" preload="auto"></audio>
            <audio id="fx_teleport" src="resources/fx_teleport.mp3" preload="auto"></audio>
            <img id="imagenperfil" src={require('../img/b1.png') } alt='' />
            <img id="imagen-pared" src={require('../resources/pared.jpg')} alt='' />
            <img id="imagen-suelo" src={require('../resources/stone_floor.jpg')} alt='' />
            <img id="imagen-suelo_Madera" src={require('../resources/madera.jpg')} alt='' />
            <img id="imagen-suelo_Arena" src={require('../resources/arena.jpg')} alt='' />
            <a-asset-item id="big-obj" src={require('./obj/big/model.obj')}></a-asset-item>
            <a-asset-item id="big-mtl" src={require('./obj/big/materials.mtl')}></a-asset-item>
            <a-asset-item id="arbol-obj" src={require('./obj/arbol/model.obj')}></a-asset-item>
            <a-asset-item id="arbol-mtl" src={require('./obj/arbol/materials.mtl')}></a-asset-item>
            <a-asset-item id="cesped-obj" src={require('./obj/cesped/model.obj')}></a-asset-item>
            <a-asset-item id="cesped-mtl" src={require('./obj/cesped/materials.mtl')}></a-asset-item>
            <a-asset-item id="mesa-obj" src={require('./bit/desk.obj')}></a-asset-item>
            <a-asset-item id="mesa-mtl" src={require('./bit/desk.mtl')}></a-asset-item>
            <a-asset-item id="pantalla-obj" src={require('./bit/wall.obj')}></a-asset-item>
            <a-asset-item id="pantalla-mtl" src={require('./bit/wall.mtl')}></a-asset-item>
            <a-asset-item id="puerta-obj" src={require('./bit/wall_door.obj')}></a-asset-item>
            <a-asset-item id="puerta-mtl" src={require('./bit/wall_door.mtl')}></a-asset-item>
            <a-asset-item id="display-obj" src={require('./obj/display/model.obj')}></a-asset-item>
            <a-asset-item id="display-mtl" src={require('./obj/display/materials.mtl')}></a-asset-item>
            <a-asset-item id="cristal_1" src={require('./obj/cristales/cristalscrystal_1.stl')}></a-asset-item>
            <a-asset-item id="cristal-mtl" src={require('./obj/cristales/texture_2.png')}></a-asset-item>
            <a-asset-item id="peligro-obj" src={require('./obj/caution/WetFloorSign.obj')}></a-asset-item>
            <a-asset-item id="peligro-mtl" src={require('./obj/caution/WetFloorSign.mtl')}></a-asset-item>
            <a-asset-item id="suelo-obj" src={require('./obj/suelo/model.obj')}></a-asset-item>
            <a-asset-item id="suelo-mtl" src={require('./obj/suelo/materials.mtl')}></a-asset-item>
            <a-asset-item id="publicidad-obj" src={require('./obj/cartel/Billboard.obj')}></a-asset-item>
            <a-asset-item id="publicidad-mtl" src={require('./obj/cartel/Billboard.mtl')}></a-asset-item>
            <a-asset-item id="carita-obj" src={require('./obj/pato6.obj')}></a-asset-item>
            <a-asset-item id="carita-mtl" src={require('./obj/feliz/material.lib')}></a-asset-item>
            <a-asset-item id="puertas-obj" src={require('./obj/puerta/doorway.obj')}></a-asset-item>
            <a-asset-item id="puertas-mtl" src={require('./obj/puerta/doorway.mtl')}></a-asset-item>
            <a-asset-item id="plantaA-obj" src={require('./obj/plantaalien/model.obj')}></a-asset-item>
            <a-asset-item id="plantaA-mtl" src={require('./obj/plantaalien/materials.mtl')}></a-asset-item>
            <a-asset-item id="nube-obj" src={require('./obj/nube/model.obj')}></a-asset-item>
            <a-asset-item id="nube-mtl" src={require('./obj/nube/materials.mtl')}></a-asset-item>
            <a-asset-item id="font" src='https://cdn.aframe.io/fonts/mozillavr.fnt'></a-asset-item>
          </a-assets>

          <a-entity sound="src:#fx_teleport"></a-entity>
          
          



          <Entity>
              <Entity
              events={{
                click: ()=>enlaces(datos.enlace1)
              }}
               position="-2.3 3 9.5"
                rotation="0 180 0"
                width="2.4"
                height="1"
                material="color:#FFFAF0" geometry="primitive:plane; width: 4; height: 1;" 
                font="#font"
                text={"value:Visitar mi portfolio;width: 3;letterSpacing:19px;yOffset:25;color:#322342"}/>
              <Entity
              events={{
                click: ()=>enlaces(datos.enlace2)
              }}
               position="4.3 3 9.5"
                rotation="0 180 0"
                width="2.4"
                height="1"
                material="color:#FFFAF0" geometry="primitive:plane; width: 4; height: 1;" 
                font="#font"
                text={"value:Visitar perfil Likendin;width: 3;letterSpacing:19px;yOffset:25;color:#322342"}/>
              <Entity
              events={{
                click: ()=>enlaces(datos.enlace3)
              }}
               position="1.3 1.5 9.5"
                rotation="0 180 0"
                width="2.4"
                height="1"
                material="color:#FFFAF0" geometry="primitive:plane; width: 4; height: 1;" 
                font="#font"
                text={"value:Visitar perfil GitHub;width: 3;letterSpacing:19px;yOffset:25;color:#322342"}/>

              <a-entity geometry="primitive: sphere; radius: 10" position="37 2 37" color="blue" static-body></a-entity>
              <Entity
              events={{
                    click: ()=>_handleClick('letras') ,
                  }}
                sound="src:#fx_teleport; poolSize:5; volume:0.2"
                obj-model="obj: #pantalla-obj; mtl: #pantalla-mtl"
                position="-6.73 2.5 7" static-body></Entity>
                <a-entity position="-6.3 4.5 3.4"
                rotation="0 90 0"
                width="2.4"
                height="1.4"
                font="#font"
                text={"value:Habilidades \n Voluntariado;width: 10;letterSpacing:9px;yOffset:25;color:#322342"}></a-entity>
                <a-entity position="6.6 4.5 11"
                rotation="0 -90 0"
                width="2.4"
                height="1.4"
                font="#font"
                text={"value:Experiencia \n Formacion;width: 10;letterSpacing:9px;yOffset:25;color:#322342"}></a-entity>
              <Entity
              events={{
                    click: ()=>_handleClick('letras-dos') ,
                  }}
                sound="src:#fx_teleport; poolSize:5; volume:0.2"
                obj-model="obj: #pantalla-obj; mtl: #pantalla-mtl"
                position="6.73 2.5 7" static-body></Entity>
              <a-box id="wall_1" color="grey" width="15" height="5" depth="1" position="-0.215 2.5 10.025" material="src:#imagen-pared" static-body></a-box>
              <a-box  color="grey" width="6" height="5" depth="1" position="1.215 2.5 -10.794" material="src:#imagen-pared" static-body></a-box>
              <a-box id="wall_3" color="grey" width="15" height="5" depth="1" position="3.731 2.5 -2.734" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
              <a-box id="wall_4" color="grey" width="15" height="5" depth="1" position="-0.949 2.5 -2.761" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
              <a-box id="wall_5" color="grey" width="6" height="5" depth="1" position="-4.465 2.5 4.268" material="src:#imagen-pared" static-body></a-box>
              <a-box id="wall_6" color="grey" width="4" height="5" depth="1" position="6.246 2.5 4.268" material="src:#imagen-pared" static-body></a-box>
              <a-box id="wall_7" color="grey" width="7" height="5" depth="1" position="7.545 2.5 6.966" material="src:#imagen-pared" static-body rotation="0 90 0"></a-box>
              <a-box id="wall_8" color="grey" width="7" height="5" depth="1" position="-7.263 2.5 6.966" material="src:#imagen-pared" static-body rotation="0 90 0"></a-box>
              <Entity
                events={{
                    click: ()=>_handleClick('puerta') ,
                  }}
                obj-model="obj: #puerta-obj; mtl: #puerta-mtl"
                position="-1.5 0 -1.761"
                static-body>
                </Entity>
              <a-entity position="-1.5 5 -1.76" rotation="0 -90 0" material="color:#FFFAF0" geometry="primitive:plane; width: 4; height: 2;" text="align:center;value:Entrar\n en\n JCMS;width:15;color:#322342"></a-entity>
              
              <a-obj-model src="#publicidad-obj" mtl="#publicidad-mtl" position="0.3 -0 -40" scale="0.1 0.1 0.1" static-body></a-obj-model>
              <a-image src="#imagenperfil" width="7" height="8" position="7.2 18.2 -39" scale="1 1 1"></a-image>

              <a-entity position="-1 18 -38"
                rotation="0 0 0"
                width="3.4"
                height="1.4"
                font="#font"
                text={"value:"+slogan+";width: 16;letterSpacing:10px;yOffset:25;color:#322342"}></a-entity>
              <a-obj-model src="#big-obj" mtl="#big-mtl" position="0 1.4 2" static-body></a-obj-model>
              <a-obj-model src="#arbol-obj" mtl="#arbol-mtl" position="0 1.4 3.3" static-body></a-obj-model>
              <a-obj-model src="#cesped-obj" mtl="#cesped-mtl" position="0 0 1.5"></a-obj-model>
              <a-obj-model src="#cesped-obj" mtl="#cesped-mtl" position="0 0 1.8"></a-obj-model>
              <a-obj-model src="#cesped-obj" mtl="#cesped-mtl" position="0.34 0 2.5"></a-obj-model>
              <a-obj-model src="#cesped-obj" mtl="#cesped-mtl" position="0.2 0 3.3"></a-obj-model>
              <a-obj-model src="#cesped-obj" mtl="#cesped-mtl" position="0.3 0 4.5"></a-obj-model>
              <a-obj-model src="#nube-obj" mtl="#nube-mtl" position="0 22 28" rotation="0 10 0" ></a-obj-model>
              <a-obj-model src="#nube-obj" mtl="#nube-mtl" position="12 22 28" rotation="0 20 0"></a-obj-model>
              <a-obj-model src="#nube-obj" mtl="#nube-mtl" position="12 22 -10" rotation="0 20 0"></a-obj-model>
              <a-obj-model src="#nube-obj" mtl="#nube-mtl" position="1 30 -30" rotation="0 20 0"></a-obj-model>
              <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="3.3 0.7 5" scale="4 4 4" static-body rotation="0 10 0"></a-obj-model>
              <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="5.3 1 5.5" scale="4 4 4" static-body rotation="0 20 0"></a-obj-model>
              <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="4 0.7 5.1" scale="4 4 4" static-body rotation="0 34 0"></a-obj-model>
              <Entity
                events={{
                  click: ()=>_handleClick('puertas') ,
                }}
                obj-model="obj: #puertas-obj; mtl: #puertas-mtl"
                position="3.5 0 -10.2" scale="8 5 5"
                static-body></Entity>
              <a-stl-model src="#cristal_1" position="0.3 0 4.5"></a-stl-model>
              <a-entity id="floor" reset={isCheck.current} static-body
              geometry="depth:100;height:0.2;width:100;" material="repeat:10 10;color:withe;metalness:0.2;roughness:0.1;src:#imagen-suelo_Arena"
              ></a-entity>
              <Entity
                events={{
                  click: ()=>_pregunta('pato') ,
                }}
                color="yellow"
                material="color: yellow"
                obj-model="obj: #carita-obj"
                position="-40 -0.4 43" rotation="0 45 0" scale="0.05 0.05 0.05"
                static-body>
                </Entity>
                <Entity static-body
                >{mensaje}
                  
                  
                </Entity>
                

          </Entity>

          <Entity position="0 22 28" rotation="0 47 0" reset={isCheck.current}>
          <Entity
                events={{
                  click: ()=>_handleClick('puertas') ,
                }}
                obj-model="obj: #puertas-obj; mtl: #puertas-mtl"
                position="3.5 14 -10.2" scale="8 5 5"
                static-body></Entity>
            <Entity      
              events={{
                    click: ()=>_handleClick('nivel2-display') 
                  }}
              obj-model="obj: #display-obj; mtl: #display-mtl"
              position="-5.73 15.5 7" rotation="0 90 0"
              static-body></Entity>
              <a-entity position="-5.73 16.2 7.15" rotation="0 90 0" geometry="primitive:plane; width: 2.1; height: 1.5;" text="align:center;value:Listado;width:1;color:#322342"></a-entity>
          
            <a-box color="grey" width="15" height="5" depth="1" position="-0.215 16.5 10.025" material="src:#imagen-pared" static-body></a-box>
            <a-box  color="grey" width="6" height="5" depth="1" position="1.215 16.5 -10.794" material="src:#imagen-pared" static-body></a-box>
            <a-box color="grey" width="15" height="5" depth="1" position="3.731 16.5 -2.734" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
            <a-box color="grey" width="15" height="5" depth="1" position="-0.949 16.5 -2.761" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
            <a-box color="grey" width="6" height="5" depth="1" position="-4.465 16.5 4.268" material="src:#imagen-pared" static-body></a-box>
            <a-box color="grey" width="4" height="5" depth="1" position="6.246 16.5 4.268" material="src:#imagen-pared" static-body></a-box>
            <a-box  color="grey" width="7" height="5" depth="1" position="7.545 16.5 6.966" material="src:#imagen-pared" static-body rotation="0 90 0"></a-box>
            <a-box color="grey" width="7" height="5" depth="1" position="-7.263 16.5 6.966" material="src:#imagen-pared" static-body rotation="0 90 0"></a-box>
            <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="3.3 14.7 5" scale="4 4 4" static-body rotation="0 10 0"></a-obj-model>
            <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="5.3 14.7 5.5" scale="4 4 4" static-body rotation="0 20 0"></a-obj-model>
            <a-obj-model src="#plantaA-obj" mtl="#plantaA-mtl" position="4 14.7 5.1" scale="4 4 4" static-body rotation="0 34 0"></a-obj-model>
            <a-entity reset="true"  id="floor2" static-body position="0 14 0" geometry="depth:40;height:0.2;width:40;" material="repeat:10 5;color:withe;metalness:0.2;roughness:0.1;src:#imagen-suelo" crossorigin="anonymous" ></a-entity>
          </Entity>

          <Entity position="0 46 -48" reset={isCheck.current}>
          <Entity
                events={{
                  click: ()=>_handleClick('puertas') ,
                }}
                obj-model="obj: #puertas-obj; mtl: #puertas-mtl"
                position="3.5 14 -10.2" scale="8 5 5"
                static-body></Entity>
            <Entity      
              events={{
                    click: ()=>_handleClick('nivel2-display')
                  }}
              obj-model="obj: #display-obj; mtl: #display-mtl"
              position="-5.73 15.5 7" rotation="0 90 0"
              static-body></Entity>
              <a-entity position="-5.73 16.2 7.15" rotation="0 90 0" geometry="primitive:plane; width: 2.1; height: 1.5;" text="align:center;value:Listado;width:1;color:#322342"></a-entity>
          
            <a-box color="grey" width="15" height="5" depth="1" position="-0.215 16.5 10.025" material="src:#imagen-pared" static-body></a-box>
            <a-box  color="grey" width="6" height="5" depth="1" position="1.215 16.5 -10.794" material="src:#imagen-pared" static-body></a-box>
            <a-box color="grey" width="15" height="5" depth="1" position="3.731 16.5 -2.734" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
            <a-box color="grey" width="15" height="5" depth="1" position="-0.949 16.5 -2.761" material="src:#imagen-pared" rotation="0 90 0" static-body></a-box>
            <a-box color="grey" width="6" height="5" depth="1" position="-4.465 16.5 4.268" material="src:#imagen-pared" static-body></a-box>
            <a-box color="grey" width="4" height="5" depth="1" position="5.246 16.5 4.268" material="src:#imagen-pared" static-body></a-box>
            <a-box  color="grey" width="7" height="5" depth="1" position="7.545 16.5 6.966" material="src:#imagen-pared"  rotation="0 90 0"></a-box>
            <a-box color="grey" width="7" height="5" depth="1" position="-7.263 16.5 6.966" material="src:#imagen-pared"  rotation="0 90 0"></a-box>
            <a-obj-model src="#peligro-obj" mtl="#peligro-mtl" position="5.3 14.2 6.5" static-body></a-obj-model>
            <a-obj-model src="#peligro-obj" mtl="#peligro-mtl" position="-5.3 14.2 8" static-body></a-obj-model>
            <a-entity id="floor3" reset="true" static-body position="0 14 0" geometry="depth:30;height:0.2;width:20;" material="repeat:10 5;color:withe;metalness:0.2;roughness:0.1;src:#imagen-suelo_Madera" crossorigin="anonymous" ></a-entity>
          </Entity>

    


      <a-entity position={camara} reset={isCheck.current} sound="src:#bg_music; autoplay:true; loop:true; volume:0.05" camera id="player" player="health: 200" userHeight="1.6"
       jump-ability
       events={{
          jump: ()=>_handleClick('salto') 
        }}
       universal-controls kinematic-body="radius:0.5" >
        <a-entity sound="src:#bg_music"></a-entity>
        <a-entity cursor position="0 0 -0.5" geometry="primitive:ring;radiusInner:0.01;radiusOuter:0.016" material="opacity:0.5;shader:flat;transparent:true;color:#ff9" scale="0.8 0.8 0.8" raycaster ></a-entity>
      </a-entity>

      
      




      <a-entity sound="src:#fx_punch; poolSize:5" position="1.351 0 0" scale="0.1 0.1 0.1" id="Ghost01" static-body="shape: box" enemy="health: 30; id: 1" obj-model="obj:resources/ghost.obj" material="src:https://ucarecdn.com/f6bf9fe3-82b4-43ba-b5b6-a7e308b64c77/">
        <a-box width="15" height="5" depth="3" position="0 0 0" static-body visible="false"></a-box>
        

      

        <a-entity sound="src:#fx_punch"></a-entity>


      	<a-animation attribute="position" to="1.351 0.1 0" direction="alternate-reverse" repeat="indefinite" easing="linear" dur="1000"></a-animation>


	    <a-entity position="2 10 10" id="1-ui">
	    	<a-entity position="0 10 0" material="color: red" geometry="primitive:plane; width: 7; height: 3;" text="align:center;value:Vida;width:30;color:#322342" id="text-health-1"></a-entity>

	    	<a-entity position="-10 -2 0" material="color: pink" geometry="primitive:plane; width: 7; height: 3;" attack-button="targetEntity: #Ghost01" text="align:center;value:Dispara;width:50;color:#322342" id="text-attack-1"></a-entity>
       </a-entity>
	  </a-entity>
    </Scene>
        
      )
    }
  //}
  
  export default Frame;