import React, { useEffect, useRef } from "react";
import ThreeJSOverlayView from "@ubilabs/threejs-overlay-view";
import { CatmullRomCurve3, Vector3 } from "three";
import loadModel from "./loadModel";
import createTrackFromCurve from "./createTrackFromCurve";
import mapOption from "./mapOption";

const ANIMATION_MS = 30000;
const FRONT_VECTOR = new Vector3(0, -1, 0);

const Animation = ({ map, route }) => {
  const overlayRef = useRef();
  const trackRef = useRef();
  const carRef = useRef();

  useEffect(() => {
    map.setCenter(route[Math.floor(route.length / 2)], 17);

    if (!overlayRef.current) {
      overlayRef.current = new ThreeJSOverlayView(mapOption.center);
      overlayRef.current.setMap(map);
    }

    const scene = overlayRef.current.getScene();
    const points = route.map((p) => overlayRef.current.latLngAltToVector3(p));
    const curve = new CatmullRomCurve3(points);

    if (trackRef.current) {
      scene.remove(trackRef.current);
    }

    trackRef.current = createTrackFromCurve(curve);
    scene.add(trackRef.current);

    loadModel().then((model) => {
      if (carRef.current) {
        scene.remove(carRef.current);
      }
      carRef.current = model;
      scene.add(carRef.current);
    });

    overlayRef.current.update = () => {
      trackRef.current.material.resolution.copy(
        overlayRef.current.getViewportSize()
      );
      if (carRef.current) {
        const progress = (performance.now() % ANIMATION_MS) / ANIMATION_MS;
        curve.getPointAt(progress, carRef.current.position);
        carRef.current.quaternion.setFromUnitVectors(
          FRONT_VECTOR,
          curve.getTangentAt(progress)
        );
        carRef.current.rotateX(Math.PI / 2);
      }
      overlayRef.current.requestRedraw();
    };
    return () => {
      scene.remove(trackRef.current);
      scene.remove(carRef.current);
    };
  }, [route]);
  return null;
};

export default Animation;
