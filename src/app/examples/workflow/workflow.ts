import { sleep } from "workflow";

export async function myWorkflow(data: { name: string; email: string }) {
  "use workflow";
  
  // Simulated steps
  console.log(`[Workflow] Sending welcome email to ${data.email}`);
  
  // Sleep / wait is native to "use workflow" using the sleep utility
  await sleep("5 seconds");
  
  console.log(`[Workflow] Sending follow-up to ${data.name}`);
  
  return { success: true };
}
