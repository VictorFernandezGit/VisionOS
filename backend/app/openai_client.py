import os
import openai

def get_insight(metrics):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = f"""
    Here are the business simulation results:
    {metrics}
    Please provide a concise, actionable insight for a founder.
    """
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100,
    )
    return response.choices[0].message.content
