      var SCREEN_WIDTH = window.innerWidth;
      var SCREEN_HEIGHT = window.innerHeight;

      var container;

      var particle;

      var camera;
      var scene;
      var renderer;

      var mouseX = 0;
      var mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;
      
      var particles = []; 
      var particleImage = new Image();
      particleImage.src = 'img/ParticleSmoke.png'; 

      function init() {

        container = document.createElement('div');
        container.setAttribute('class', 'snow');
        document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();
        scene.add(camera);
          
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
          
        for (var i = 0; i < 500; i++) {

          particle = new Particle3D( material);
          particle.position.x = Math.random() * 2000 - 1000;
          particle.position.y = Math.random() * 2000 - 1000;
          particle.position.z = Math.random() * 2000 - 1000;
          particle.scale.x = particle.scale.y =  1;
          scene.add( particle );
          
          particles.push(particle); 
        }

        container.appendChild( renderer.domElement );
        
        // setInterval( loop, 1000 / 60 );

        animloop();
    }

      function loop() {

      for(var i = 0; i<particles.length; i++)
        {

          var particle = particles[i]; 
          particle.updatePhysics(); 
  
          with(particle.position)
          {
            if(y<-1000) y+=2000; 
            if(x>1000) x-=2000; 
            else if(x<-1000) x+=2000; 
            if(z>1000) z-=2000; 
            else if(z<-1000) z+=2000; 
          }       
        }
      
        camera.lookAt(scene.position); 
        renderer.render( scene, camera );
      }

      // shim layer with setTimeout fallback
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
 
      function animloop() {
        requestAnimFrame(animloop);
        loop();
      };