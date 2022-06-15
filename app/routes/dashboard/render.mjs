export function render({ data }) {
  return `
    <ul>
      ${data.map(item => `<li>${item.name}</li>`).join("")}
    </ul>
  `;
}
