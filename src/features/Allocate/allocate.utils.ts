export const scrollToAllocationsTable = (tokenName: string) => {
  const elementId =
    tokenName.toLowerCase() === 'kvcm'
      ? 'kvcm-allocations'
      : 'k2-allocations';
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

