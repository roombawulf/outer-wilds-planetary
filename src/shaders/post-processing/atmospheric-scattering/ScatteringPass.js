import { Pass } from "postprocessing";
import * as THREE from "three";

import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";

class ScatteringPass extends Pass {
    constructor(scene, camera) {
        super("ScatteringPass");
        this.scene = scene;
        this.camera = camera;
        this.fullscreenMaterial = this.material();
    }

    render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {
        // apply uniforms
        const material = this.fullscreenMaterial
        material.uniforms.sceneBuffer.value = inputBuffer.texture;

        renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
        renderer.render(this.scene, this.camera);
    }

    material() {
        return new THREE.ShaderMaterial({
            uniforms: {
                sceneBuffer: { value: null },
            },
            vertexShader: vertex,
            fragmentShader: fragment,

            depthWrite: false,
            depthTest: false,
        });
    }
}

export { ScatteringPass };
