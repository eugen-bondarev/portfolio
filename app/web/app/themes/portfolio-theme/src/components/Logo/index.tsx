import clsx from "clsx";
import styles from "./styles.module.scss";

import ForceGraph3D from "react-force-graph-3d";
import "three";
import SpriteText from "three-spritetext";
import { useRef, useEffect } from "react";
import useWindowSize from "../../util/hooks/useWindowSize";
import tryCatch from "../../util/try-catch";

interface LogoProps {
  nodes: string;
  additionalConnections: string;
}

const Logo = ({
  nodes: strNodes,
  additionalConnections: strAdditionalConnections,
}: LogoProps) => {
  const fgRef = useRef();

  const tree: Record<string, string[]> = {
    "My skills": [],
    "Programming languages": ["php", "C++", "Rust", "JavaScript", "Java"],
    "Client-Server": ["Rest API", "GraphQL", "TCP/UDP"],
    DevOps: ["GitLab Pipelines", "GitHub Actions", "Docker"],
    Cloud: ["Terraform", "Kubernetes", "Helm", "Linode", "GKE"],
    Conceptions: ["AI", "Gradient descent", "Genetic algorithms"],
    "Frameworks and libraries": [
      "Vulkan",
      "OpenGL",
      "ImGui",
      "React",
      "Express",
      "Next.js",
    ],
    "Build tools": ["CMake", "Webpack", "cargo"],
  };

  // const additionalConnections = [["foo", "bar"]];
  const additionalConnections = [
    ["My skills", "Programming languages"],
    ["My skills", "Client-Server"],
    ["My skills", "DevOps"],
    ["My skills", "Cloud"],
    ["My skills", "Conceptions"],
    ["My skills", "Frameworks and libraries"],
    ["Vulkan", "C++"],
    ["OpenGL", "C++"],
    ["OpenGL", "Java"],
    ["php", "Rest API"],
    ["JavaScript", "Rest API"],
    ["JavaScript", "React"],
    ["JavaScript", "Express"],
    ["JavaScript", "Next.js"],
    ["Cloud", "DevOps"],
    ["Helm", "Kubernetes"],
    ["Terraform", "GKE"],
    ["Terraform", "Linode"],
    ["AI", "Gradient descent"],
    ["AI", "Genetic algorithms"],
    ["Docker", "Cloud"],
    ["CMake", "C++"],
    ["Webpack", "JavaScript"],
    ["cargo", "Rust"],
    ["GraphQL", "JavaScript"],
    ["Gradient descent", "C++"],
    ["Genetic algorithms", "C++"],
    ["Genetic algorithms", "Rust"],
    ["C++", "TCP/UDP"],
  ];

  const windowSize = useWindowSize();
  const mobile = (windowSize.width ?? 0) < 1024;

  if (mobile) {
    return (
      <div
        style={
          {
            "--tw-prose-bullets": "var(--wp--preset--color--accent)",
          } as Record<string, string>
        }
      >
        <ul>
          {Object.keys(tree).map((key, i) => (
            <li key={i}>
              <h2>{key}</h2>
              <ul>
                {tree[key].map((_key, j) => (
                  <li key={j}>
                    <h3>{_key}</h3>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const nodes = Object.keys(tree)
    .map((key, i) => [
      { id: key, group: i * 2 },
      ...tree[key].map((_key) => ({ id: _key, group: i * 2 + 1 })),
    ])
    .flat();

  const links = [
    ...Object.keys(tree)
      .map((key) => tree[key].map((_key) => ({ source: key, target: _key })))
      .flat(),
    ...additionalConnections.map((item) => ({
      source: item[0],
      target: item[1],
    })),
  ];

  const d = {
    nodes,
    links,
  };

  // useEffect(() => {
  //   if (!mobile || !fgRef?.current) {
  //     return
  //   }
  //   if (fgRef?.current?.cameraPosition) {
  //     fgRef.current.cameraPosition({ z: distance })
  //   }

  //   // camera orbit
  //   let angle = 0
  //   setInterval(() => {
  //     if (fgRef?.current?.cameraPosition) {
  //       fgRef.current.cameraPosition({
  //         x: distance * Math.sin(angle),
  //         z: distance * Math.cos(angle),
  //       })
  //       angle += Math.PI / distance
  //     }
  //   }, 10)
  // }, [mobile, fgRef])

  return (
    <div
      className={clsx(styles.logo, { "pointer-events-none": mobile })}
      onWheelCapture={(e) => e.stopPropagation()}
    >
      <style>{".scene-nav-info { opacity: 0; }"}</style>
      <ForceGraph3D
        ref={mobile ? fgRef : undefined}
        backgroundColor="#00000000"
        controlType="trackball"
        linkOpacity={0.2}
        linkAutoColorBy={(f) => {
          return d.nodes.find((node) => node.id === f.source)?.group;
        }}
        linkWidth={2}
        graphData={d}
        nodeAutoColorBy="group"
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.id);
          sprite.fontFace = "Lato";
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
      />
    </div>
  );
};

export default Logo;
