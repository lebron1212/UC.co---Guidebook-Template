export async function handler(event, context) {
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const baseId = 'appka3xzQTMmxJBo5';
  const tableName = 'Experience Partners 2025';

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

