/**
 * Calculates the date exactly 3 months ago from today and returns it in "YYYY-MM-DD" format.
 * @returns {string} The date three months ago in "YYYY-MM-DD" format.
 */
function getThreeMonthsAgoDate() {
  // Get today's date
  let today = new Date();

  // Calculate the date three months ago
  let threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Convert the date to the "YYYY-MM-DD" format
  let formattedDate = threeMonthsAgo.toISOString().slice(0, 10);

  // Return the result
  return formattedDate;
}

export default getThreeMonthsAgoDate
