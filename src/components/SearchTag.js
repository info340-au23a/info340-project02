import React from "react";

export function SearchTag(props) {
  const { tagsData } = props;

  const tagArray = tagsData.map((tagObj) => {
    const transform = (
      <p key={tagObj.id}>
        <input type="checkbox" id={tagObj.id} />
        <label htmlFor={tagObj.id}> {tagObj.word}</label>
      </p>
    );
    return transform;
  });

  return (
    <div className="tags">
      <h2>Select Tags</h2>
      <form>{tagArray}</form>
    </div>
  );
}
