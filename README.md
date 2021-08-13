# EEO_Civic_Fellows_2021

## What is this branch?
The tableview branch is for the tableview + index page version of the EEO Tables Tool without the MSA lookup tool (while the main branch was used for Katie and fellow Fellow Rebecca Xun's collaboration on the MSA Lookup Tool). This is the most recent version of the EEO Tables Tool Project code developed by Katie Taylor with the collaboration and advising of Census contractor Peggy Gill during Katie's Civic Digital Fellowship in summer of 2021. This code relies on resources on the Census web servers, so the tool will not work if you try to run it on another server. Although the main page is called index.php, that extension is only for standardization purposes, and its content is mainly html.

## EEO Tables Tool Project

Katie Taylor has been expanding the capabilities of an existing tool developed for disseminating EEO Tabulation data. Peggy Gill initially developed this tool in response to user needs introduced by the retirement of the American Fact Finder.

### Background

The EEO (or Equal Employment Opportunity) Tabulation is a custom tabulation of data from the American Community Survey's 5-year data, in this case from 2014 to 2018. It's sponsored by a consortium of 4 Federal agencies and is designed to measure the effects of and compliance with EEO laws and similar equity efforts (e.g. affirmative action programs).

### Problem

The EEO data was previously available via the American Fact Finder, but that platform was shut down last year, and the EEO tables are not compatible with the new data.census.gov platform due to their complex data structure. Initially, after the American Fact Finder was retired, data users were only able to access the EEO data via a collection of large csv files on the Census FTP site. Depending on what they're looking for and its complexity, many users have found it rather inconvenient, if not nearly impossible, to find what they needed in the raw csv data. It was clear that users needed a tool with search and query capabilities.

### Solution

The EEO Tables Tool allows users to simply select their table and geography, and then click a button to get their data.
After the user is served the requested data for their specific geography, they can also choose to search for one or more specific data labels and download their filtered data. Until this summer (2021), the tool was built to serve only 6 tables. In collaboration with my project advisor, Peggy Gill, my work throughout the Fellowship will allow users to access data from a variety of geographies from 20 tables, so that's 14 more tables than were previously accessible via the tool.  This work has included development on the table and geography selection part of the tool, making it both functional in serving the increased number of tables and more user-friendly. We've also adapted the part of the tool that displays the data table in order to accommodate differences in the label groupings between table sets.

## What was that MSA Lookup Tool you mentioned at the beginnning?

It's a lookup feature in the EEO Tables Tool for metropolitan & micropolitan statistical areas (aka MSAs) that are suppressed in the EEO tabulation due to not meeting certain data thresholds. This Suppressed MSA Lookup Tool within the EEO Tables Tool would provide a convenient interface through which a user can input an MSA name and receive back the components that make up that MSA. The user can then estimate a data tabulation based on these components' data. Our tool pulls together publically-available data from various sources that are currently not in a user-friendly format. My main contributions to the Suppressed MSA Lookup have included developing the first iteration of the component lookup functionality & displaying the results from the lookup. The MSA Lookup Tool has not been approved by the Consortium, and as such progress on it has been halted and it is unclear if the tool will be added to the production version of EEO Tables Tool.
