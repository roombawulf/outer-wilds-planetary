import { Uniform, Vector3, Matrix4 } from "three";
import { BlendFunction, Effect, EffectAttribute } from "postprocessing";

import fragmentShader from "./fragment.glsl";

class AtmosphereEffect extends Effect {
    constructor(
        scene,
        camera,
        sunPosition,
        planetPosition,
        planetRadius,
        atmosphereRadius,
        falloffFactor,
        sunIntensity,
        densityModifier,
        scatteringStrength,
        wavelength
    ) {
        super("AtmosphereEffect", fragmentShader, {
            blendFunction: BlendFunction.Normal,
            attributes: EffectAttribute.DEPTH,
            uniforms: new Map([
                // CAMERA UNIFORMS
                ["cameraPos", new Uniform(new Vector3())],
                ["projectionMatrixInverse", new Uniform(new Matrix4())],
                ["viewMatrixInverse", new Uniform(new Matrix4())],

                // POSITION UNIFORMS
                ["sunPosition", new Uniform(new Vector3().fromArray(sunPosition))],
                ["planetPosition", new Uniform(new Vector3().fromArray(planetPosition))],

                // RADIUS UNIFORMS
                ["planetRadius", new Uniform(planetRadius)],
                ["atmosphereRadius", new Uniform(atmosphereRadius)],

                // ATMOSPHERE UNIFORMS
                ["falloffFactor", new Uniform(falloffFactor)],
                ["sunIntensity", new Uniform(sunIntensity)],
                ["densityModifier", new Uniform(densityModifier)],
                ["scatteringStrength", new Uniform(scatteringStrength)],

                // WAVELENGTH UNIFORM
                ["wavelength", new Uniform(new Vector3().fromArray(wavelength))],
            ]),
        });

        this.scene = scene;
        this.camera = camera;
        this.planetPosition = planetPosition;
    }

    get mainCamera() {
        return this.camera
    }
    set mainCamera(value) {
        this.camera = value
    }
    
    get planetPosition() {
        return this.uniforms.get("planetPosition").value;
    }
    set planetPosition(value) {
        this.uniforms.get("planetPosition").value = value;
    }

    get sunPosition() {
        return this.uniforms.get("sunPosition").value;
    }
    set sunPosition(value) {
        this.uniforms.get("sunPosition").value = value;
    }

    get planetRadius() {
        return this.uniforms.get("planetRadius").value;
    }
    set planetRadius(value) {
        this.uniforms.get("planetRadius").value = value;
    }

    get atmosphereRadius() {
        return this.uniforms.get("atmosphereRadius").value;
    }
    set atmosphereRadius(value) {
        this.uniforms.get("atmosphereRadius").value = value;
    }

    get falloffFactor() {
        return this.uniforms.get("falloffFactor").value;
    }
    set falloffFactor(value) {
        this.uniforms.get("falloffFactor").value = value;
    }

    get sunIntensity() {
        return this.uniforms.get("sunIntensity").value;
    }
    set sunIntensity(value) {
        this.uniforms.get("sunIntensity").value = value;
    }

    get densityModifier() {
        return this.uniforms.get("densityModifier").value;
    }
    set densityModifier(value) {
        this.uniforms.get("densityModifier").value = value;
    }

    get scatteringStrength() {
        return this.uniforms.get("scatteringStrength").value;
    }
    set scatteringStrength(value) {
        this.uniforms.get("scatteringStrength").value = value;
    }

    get wavelength() {
        return this.uniforms.get("wavelength").value;
    }
    set wavelength(value) {
        this.uniforms.get("wavelength").value = value;
    }

    update(renderer, inputBuffer, deltaTime) {
        this.camera.getWorldPosition(this.uniforms.get("cameraPos").value);
        this.uniforms.get("projectionMatrixInverse").value = this.camera.projectionMatrixInverse;
        this.uniforms.get("viewMatrixInverse").value = this.camera.matrixWorld;
    }
}
export { AtmosphereEffect };
