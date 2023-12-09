import React, { useState } from "react";

export function SearchTag(props) {
  const { tagsData, selectedTags,onTagChange} = props;
  

  

  const tagArray = tagsData.map((tagObj) => {
    const transform = (
      <p key={tagObj.id}>
        <input type="checkbox" id={tagObj.word} onChange={onTagChange} checked={selectedTags.includes(tagObj.word)}/>
        <label htmlFor={tagObj.id}> {tagObj.word}</label>
      </p>
    );
    return transform;
  });

  return (
    <div className="tags">
      <h2>Select Tags for your wordlist!</h2>
      <form>{tagArray}</form>
    </div>
  );
}
