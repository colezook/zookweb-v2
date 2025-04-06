"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Color } from "three"

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Initial mobile check
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())

    // Create scene, camera, and renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    // Set renderer size with 1:1 aspect ratio
    const container = mountRef.current
    const size = Math.min(container.clientWidth, container.clientHeight)
    renderer.setSize(size, size)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create an atmospheric glow using a custom shader
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
    const atmosphereFragmentShader = `
     uniform vec3 glowColor;
     varying vec3 vNormal;
     void main() {
       float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
       gl_FragColor = vec4(glowColor, 1.0) * intensity;
     }
   `
    const atmosphereGeometry = new THREE.SphereGeometry(15.6, 32, 32)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        glowColor: { value: new Color(0x38bdf8) },
      },
    })
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphereMesh)

    // Create wireframe globe
    const wireframeGeometry = new THREE.SphereGeometry(15, 32, 32)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const wireframeGlobe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframeGlobe)

    // Create solid globe (initially invisible)
    const solidGeometry = new THREE.SphereGeometry(14.7, 64, 64)
    const solidMaterial = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
    })
    const solidGlobe = new THREE.Mesh(solidGeometry, solidMaterial)
    scene.add(solidGlobe)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(30, 30, 30)
    scene.add(pointLight)

    camera.position.z = 30

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.enableZoom = false
    controls.enabled = !checkMobile() // Disable controls initially if mobile

    // Set single color for the globe
    const globeColor = new Color(0x38bdf8) // sky-400

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate the globes and atmosphere
      wireframeGlobe.rotation.y += 0.003
      solidGlobe.rotation.y += 0.003
      atmosphereMesh.rotation.y += 0.0015
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Load high-resolution textures
    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (url: string) =>
      new Promise((resolve) => {
        textureLoader.load(url, (texture) => resolve(texture))
      })

    Promise.all([
      loadTexture("/earth-texture-compressed.jpg"),
      loadTexture("/earth-bump-compressed.jpg"),
      loadTexture("/earth-specular-compressed.jpg"),
    ]).then(([texture, bumpMap, specularMap]) => {
      const highResMaterial = new THREE.MeshPhongMaterial({
        map: texture as THREE.Texture,
        bumpMap: bumpMap as THREE.Texture,
        bumpScale: 0.05,
        specularMap: specularMap as THREE.Texture,
        specular: new THREE.Color("grey"),
      })

      // Transition to the high-res textured globe
      const transitionDuration = 1 // seconds
      const startTime = Date.now()

      const transitionToHighRes = () => {
        const elapsedTime = (Date.now() - startTime) / 1000
        const progress = Math.min(elapsedTime / transitionDuration, 1)

        solidGlobe.material = highResMaterial
        solidGlobe.material.opacity = progress
        wireframeMaterial.opacity = 0.5 * (1 - progress)

        if (progress < 1) {
          requestAnimationFrame(transitionToHighRes)
        } else {
          scene.remove(wireframeGlobe)
        }
        renderer.render(scene, camera)
      }

      transitionToHighRes()
    })

    const handleResize = () => {
      // Maintain 1:1 aspect ratio on resize
      const container = mountRef.current
      if (!container) return
      
      const size = Math.min(container.clientWidth, container.clientHeight)
      renderer.setSize(size, size)
      
      // Update mobile status and enable/disable controls
      const mobileCheck = checkMobile()
      setIsMobile(mobileCheck)
      controls.enabled = !mobileCheck
    }
    window.addEventListener("resize", handleResize)

    const hintTimer = setTimeout(() => {
      // Only show hint on non-mobile devices where dragging is enabled
      if (!checkMobile()) {
        setShowHint(true)
      } else {
        setShowHint(false)
      }
    }, 3000)

    // Cleanup hint timer on unmount regardless of initial state
    const finalHintTimer = hintTimer

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      // Check if mountRef.current exists before attempting removal
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      controls.dispose()
      clearTimeout(finalHintTimer)
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full flex items-center justify-center ${isMobile ? 'pointer-events-none' : ''}`}
    >
    </div>
  )
}