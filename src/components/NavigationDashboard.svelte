<script lang="ts">
  import type { User } from 'firebase/auth';
  import { getAuth } from 'firebase/auth';
  import { app } from '../firebase/Firebase';
  import { goto } from '$app/navigation';
  import data from '../data.json';
 

  export let user: User | null;
  let isLoading: boolean = true;

  const auth = getAuth(app);

  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      goto('/login');
    } catch (error) {
      console.log(error);
    }
  };

  setTimeout(() => {
    isLoading = false;
  }, 1000); // Zpoždění zobrazení seznamu odkazů o alespoň 4 sekundy

  $: {
    if (user !== null) {
      isLoading = false;
    }
  }

  const memberCount = data.length;
</script>

{#if isLoading}
  <div class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
  </div>
{:else}
  {#if user}
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div class="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
        <div class="flex items-center justify-center h-14 border-b">
          <div>INFO-GRAPHICS</div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-4 space-y-1">
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-gray-500">Menu</div>
              </div>
            </li>
            <li>
              <a
                href="#"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Members</span>
                <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full"
                  >{memberCount}</span
                >
              </a>
            </li>
            <li>
              <button
                on:click={handleLogout}
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  {:else}
    <p>Login to the Profile</p>
  {/if}
{/if}
