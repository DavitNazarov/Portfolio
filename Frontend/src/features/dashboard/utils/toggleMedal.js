export function toggleMedal(medals, medal) {
  return medals.includes(medal)
    ? medals.filter((item) => item !== medal)
    : [...medals, medal];
}
