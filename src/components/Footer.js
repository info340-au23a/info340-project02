import React from "react";

export function Footer(props) {
  const { imageRef } = props;

  return (
    <footer>
      <div className="cite">
        {" "}
        {imageRef && (
          <p>
            <cite>{imageRef}</cite>
          </p>
        )}
        <p>&copy; 2023 Spelling Adventures</p>
      </div>
    </footer>
  );
}
