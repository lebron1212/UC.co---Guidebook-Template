export async function handler(event, context) {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE;

  // Add logging
  console.log('=== Airtable Fetch Debugging ===');
  console.log('AIRTABLE_API_KEY exists:', !!airtableApiKey);
  console.log('AIRTABLE_BASE_ID:', baseId);
  console.log('AIRTABLE_TABLE:', tableName);

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  console.log('Fetching Airtable URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text(); // read error body
      console.error('Airtable API error response:', errorText);
      throw new Error(`Airtable error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched data:', JSON.stringify(data)); // optional, careful if big data

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Function caught an error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
