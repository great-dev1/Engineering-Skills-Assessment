# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
 The overall process should be like the followings:
- Create a new function getAgentsByFacility(), being called with Facility's id, returning all Agents worked that quarter, including some metadata about the Shift each Agent worked
- On Facility Dashboard, it shows a table of Agents
  columns: No, Name, Shifts, id(default is their database id)/On mouse hover, it shows an edit icon smoothly, when clicked, shows a prompt to enter a custom id.
  When the Facility enters a custom id and clicks OK, In Agents table, the agent is added a custom id for the facility (In Agents table, there should be a field named CustomIds which can save a json (keys: Facility ids, values: custom ids))

There should be 3 individual tickets
1. Getting Agents list by Facility
  Acceptance criteria: the return value should be an array of json objects, each of which has the info of an agent.
  Time/effort estimates: 15mins
  Implementation details: it can simply implemented using the already existing function - getShiftsByFacility, which means once you get the array of Shifts by Facility, each Shift has the info of the Agent assigned to so you can get the array of Agents from it. In the point of readability of code and project structure, it's a good idea to create a new function named getAgentsByFacility()

2. Creating a new function - saveAgentCustomIdByFacility(agentId, facilityId)
  Acceptance criteria: it adds the customId for the passed facility to the passed agent in the DB.
  Time/effort estimates: 30mins
  Implementation details: In Agents table, add a new field named CustomIds which can save a json(keys: facility ids, values: custom ids)

3. Implementing the UI of agents' table on Facility Dashboard
  Acceptance criteria: The result is a table of agents who worked for the facility. columns: No, Name, Shifts, id(default is their database id)/On mouse hover, it shows an edit icon smoothly, when clicked, shows a prompt to enter a custom id. When the Facility enters a custom id and clicks OK, it calls a function - saveAgentCustomIdByFacility(agentId, facilityId)
  Time/effort estimates: 30mins
  Implementation details: On facility dashboard, you can get the id of the current facility. And you lists the agents in table, each of row has the info of an agent including its id so when the edit icon on the row is clicked, you can get the id of the agent. Pass the ids of agent and facility to the function - saveAgentCustomIdByFacility()

4. Updating the existing function - generateReport()
  Acceptance criteria: It converts the list of Shifts into a PDF, on which there are agents info by shift including its id and the id is the custom id by facility instead of its internal database id.