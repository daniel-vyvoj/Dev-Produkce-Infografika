<script>
    // Define an array of sample data
    const users = [
      { date: '2023-01-01', tokens: 100, user: 'User1', type: 'Regular', notes: 'Lorem ipsum dolor sit amet' },
      { date: '2023-01-02', tokens: 200, user: 'User2', type: 'Premium', notes: 'Consectetur adipiscing elit' },
      { date: '2023-01-03', tokens: 150, user: 'User3', type: 'Regular', notes: 'Sed do eiusmod tempor incididunt' },
      // Add more data as needed
    ];
  </script>
        <h1 class="text-center font-bold"> Data Table</h1>
  <div class="my-4">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th class="border p-2">Date</th>
          <th class="border p-2">Tokens</th>
          <th class="border p-2">User</th>
          <th class="border p-2">Type</th>
          <th class="border p-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td class="border p-2">{user.date}</td>
            <td class="border p-2">{user.tokens}</td>
            <td class="border p-2">{user.user}</td>
            <td class="border p-2">{user.type}</td>
            <td class="border p-2">{user.notes}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  