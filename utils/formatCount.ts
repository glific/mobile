function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count < 10000) {
    const thousands = Math.floor(count / 1000);
    const remainder = count % 1000;
    if (remainder < 100) {
      return `${thousands}k`;
    } else {
      return `${thousands}.${Math.floor(remainder / 100)}k`;
    }
  } else {
    const tenThousands = Math.floor(count / 1000);
    return `${tenThousands}k`;
  }
}

export default formatCount;
