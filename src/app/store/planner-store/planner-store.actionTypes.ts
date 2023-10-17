export enum ActionTypes {
  GET_TEACHERS = '[PLANNER_FILTER] Get teachers',
  GET_TEACHERS_SUCCESS = '[GET_TEACHERS_API] Get teachers success',
  GET_TEACHERS_FAILURE = '[GET_TEACHERS_API] Get teachers failure',

  GET_DISCIPLINES = '[PLANNER_FILTER] Get disciplines',
  GET_DISCIPLINES_SUCCESS = '[GET_DISCIPLINES_API] Get disciplines success',
  GET_DISCIPLINES_FAILURE = '[GET_DISCIPLINES_API] Get disciplines failure',

  GET_FACULTIES = '[PLANNER_FILTER] Get faculties',
  GET_FACULTIES_SUCCESS = '[GET_FACULTIES_API] Get faculties success',
  GET_FACULTIES_FAILURE = '[GET_FACULTIES_API] Get faculties failure',

  GET_SPECIALTIES = '[PLANNER_FILTER] Get specialties',
  GET_SPECIALTIES_SUCCESS = '[GET_SPECIALTIES_API] Get specialties success',
  GET_SPECIALTIESS_FAILURE = '[GET_SPECIALTIES_API] Get specialties failure',

  GET_COURSES = '[PLANNER_FILTER] Get courses',
  GET_COURSES_SUCCESS = '[GET_COURSES_API] Get courses success',
  GET_COURSES_FAILURE = '[GET_COURSES_API] Get courses failure',

  GET_BUILDINGS = '[PLANNER_PAGE] Get buildings',
  GET_BUILDINGS_SUCCESS = '[GET_BUILDINGS_API] Get buildings success',
  GET_BUILDINGS_FAILURE = '[GET_BUILDINGS_API] Get buildings failure',

  CREATE_BUILDING = '[MAINTENANCE_PAGE] Create building',
  CREATE_BUILDING_SUCCESS = '[CREATE_BUILDING_API] Create building success',
  CREATE_BUILDING_FAILURE = '[CREATE_BUILDING_API] Create building failure',

  UPDATE_BUILDING = '[MAINTENANCE_PAGE] Update building',
  UPDATE_BUILDING_SUCCESS = '[CREATE_BUILDING_API] Update building success',
  UPDATE_BUILDING_FAILURE = '[CREATE_BUILDING_API] Update building failure',

  DELETE_BUILDING = '[MAINTENANCE_PAGE] Delete building',
  DELETE_BUILDING_SUCCESS = '[DELETE_BUILDING_API] Delete building success',
  DELETE_BUILDING_FAILURE = '[DELETE_BUILDING_API] Delete building failure',
}
