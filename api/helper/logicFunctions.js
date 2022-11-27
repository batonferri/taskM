export const getUserLogicFun = (data) => {
  let newUserArray = [];
  let newTaskArray = [];
  let newTaskCount = [];

  for (const element of data) {
    const {
      userId,
      full_name,
      email,
      profile_pic,
      is_admin,
      totalTasks,
      tasksInProgress,
      tasksToDo,
      tasksDone,
      ...tasks
    } = element;
    newUserArray.push({
      userId,
      full_name,
      email,
      profile_pic,
      is_admin,
    });
    newTaskCount.push({
      totalTasks,
      tasksInProgress,
      tasksToDo,
      tasksDone,
    });
    newTaskArray.push(tasks);
  }

  return {
    ...newUserArray[0],
    taskCount: newTaskCount[0],
    tasks: newTaskArray,
  };
};
