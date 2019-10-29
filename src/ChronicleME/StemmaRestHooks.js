import { useState, useEffect } from 'react';

export function useSectionList() {
  const [sectionList, setSectionList] = useState(null);

  useEffect(() => {
    function handleSectionList(data) {
        setSectionList(data);
    }

    const sectionListURL = process.env.PUBLIC_URL + '/data/sections.json';
    fetch(sectionListURL)
        .then(r => r.json())
        .then(data => handleSectionList(data))
        .catch(console.error.bind(console));
  });

  return sectionList;
}