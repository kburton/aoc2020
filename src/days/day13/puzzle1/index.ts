interface Schedule {
  now: number;
  ids: Array<number>;
}

interface Due {
  id: number;
  due: number;
}

const nextDue = (now: number, id: number): Due => ({
  id,
  due: now + id - (now % id)
});

const parseData = (data: Array<string>): Schedule => ({
  now: parseInt(data[0], 10),
  ids: data[1].split(",").filter(id => id !== "x").map(id => parseInt(id, 10)),
});

const solution = (data: Array<string>): string => {
  const schedule = parseData(data);
  const dueList = schedule.ids.map(id => nextDue(schedule.now, id));
  const next = dueList.reduce((acc: Due|null, due) => acc === null || acc.due > due.due ? due : acc, null);
  return `${(next!.due - schedule.now) * next!.id}`;
};

export default solution;
