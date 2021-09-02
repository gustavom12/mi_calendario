export default function AvailableTurns(duration: number, data: any) {
  if (!data.config) return null;
  const config = data?.config[0];
  const turnos = data?.turnos;
  const intervalsAvailables: number[] = [];
  const intervalosEnUso: number[] = [];
  const turnosDisponibles: number[] = [];
  let finishHour = 0;
  if (config?.desde !== '00:00:00' && config?.hasta !== '00:00:00') {
    pushAvailableHours(config?.desde, config?.hasta, intervalsAvailables);
    finishHour = Number(config?.hasta?.replaceAll(':', ''));
  }
  if (config?.desde_1 !== '00:00:00' && config?.hasta_1 !== '00:00:00') {
    pushAvailableHours(config?.desde_1, config?.hasta_1, intervalsAvailables);
    finishHour = Number(config?.hasta_1?.replaceAll(':', ''));
  }
  turnos?.forEach((turno: any) => {
    const turnoDesde = Number(turno?.hora?.replaceAll(':', ''));
    const turnoDuracion = turno.duracion_minutos * 100;
    let interval = turnoDesde;
    intervalosEnUso.push(interval);
    while (interval < turnoDesde + turnoDuracion) {
      intervalosEnUso.push(interval);
      interval % 10000 === 5000 ? (interval += 5000) : (interval += 1000);
    }
  });
  for (let i = 0; i < intervalsAvailables.length; ) {
    let intervaloDisponible = true;
    for (let j = 0; j < duration / 10; j++) {
      if (
        intervalosEnUso.includes(intervalsAvailables[i + j]) ||
        intervalsAvailables[i + j] > finishHour
      ) {
        intervaloDisponible = false;
        break;
      }
    }
    if (intervaloDisponible) {
      turnosDisponibles.push(intervalsAvailables[i]);
      i += duration / 10;
    } else i++;
  }
  return turnosDisponibles;
}

function pushAvailableHours(
  desde: string,
  hasta: string,
  intervalsAvailables: number[]
) {
  const inNumberDesde = Number(desde?.replaceAll(':', ''));
  const inNumberHasta = Number(hasta?.replaceAll(':', ''));
  let actualInterval = inNumberDesde;
  while (actualInterval < inNumberHasta) {
    //aumenta 10 minutos
    intervalsAvailables.push(actualInterval);
    if (actualInterval % 10000 === 5000) actualInterval += 5000;
    else actualInterval += 1000;
  }
}
