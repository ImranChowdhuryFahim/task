const encode = (URL) => {
  const encodedURL = btoa(URL);
  const chunks = encodedURL.match(/.{1,18}/g);
  return chunks.sort(() => Math.random() - 0.7);
};

function generatePermutation(arr) {
  let resultArr = [];
  if (arr.length === 0) return [];
  if (arr.length === 1) return [arr];

  for (let i = 0; i < arr.length; i++) {
    const currentElement = arr[i];

    const otherElements = arr.slice(0, i).concat(arr.slice(i + 1));
    const swappedPermutation = generatePermutation(otherElements);

    for (let j = 0; j < swappedPermutation.length; j++) {
      const finalSwappedPermutation = [currentElement].concat(
        swappedPermutation[j]
      );

      resultArr.push(finalSwappedPermutation);
    }
  }

  return resultArr;
}

const decode = (chunks) => {
  const all_permutations = generatePermutation(chunks);
  //   console.log(all_permutations.length);
  const potentialURL = all_permutations.map((line) => {
    return atob(line.join(""));
  });
  console.log(potentialURL);
};

const chunks = encode(
  "https://www.notion.so/work-pool/Frontend-Challenges-2af9d0933f9a4d08bc3ee7bcaa837599"
);
console.log(chunks);

decode(chunks);
