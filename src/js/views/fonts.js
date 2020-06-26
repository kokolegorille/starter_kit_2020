import React from "react";

const Fonts = () => {
  const fonts = [
    "anurati", "cherrySwash", "dosis", "flamenco",
    "inconsolata", "italiana", "monospace", "montserrat",
    "roboto", "journal", "typewriter"
  ];

  return (
    <>
      <h2>Sample Fonts</h2>
      {
        fonts.map(font => 
          <p className={font} key={font}>
            {font.toUpperCase()}: the quick brown fox jumps over the lazy dog
          </p>
        )
      }
    </>
  );
};

export default Fonts;
