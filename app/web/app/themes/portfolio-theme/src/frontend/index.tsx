window.ANIMA_FORMS_BOILERPLATE_COMPONENTS = {};
import "./dark-mode";

import importAll from "../util/importAll";

const contexts = require.context("../components", true, /lazy\.ts$/);
importAll(contexts);

import ReactDOM from "react-dom";
import React from "react";
import "./home";
import "./index.scss";
import renderApps from "./render-apps";
import { createSlider } from "../util/slider";

window.addEventListener("DOMContentLoaded", () => renderApps());

window.addEventListener("DOMContentLoaded", () =>
  (Array.from(document.querySelectorAll(".slider")) as HTMLElement[]).forEach(
    (slider) => createSlider(slider)
  )
);

import "./modules/header";
