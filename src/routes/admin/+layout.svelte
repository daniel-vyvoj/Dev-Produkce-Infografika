<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuth, type User } from 'firebase/auth';
    import { app } from '../../firebase/Firebase';
    import { goto } from '$app/navigation';
    import NavigationDashboard from "../../components/NavigationDashboard.svelte";

    // Deklarace proměnných
    const auth = getAuth(app);
    let user: User | null = null;
    let isPageLoading = true; // Nová proměnná pro zobrazení spinneru

    // Funkce, která se spustí při načtení stránky
    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                user = authUser;
            } else {
                goto('/login');
            }
            // Skrytí spinneru po 5 sekundách
            setTimeout(() => {
                isPageLoading = false;
            }, 250);
        });
        return () => unsubscribe();
    });

    // Otevření a zavření modálního okna pro editaci profilu
    let showModal = false;
    const handleOpenModal = () => {
        showModal = true;
    };
    const handleCloseModal = () => {
        showModal = false;
    };
</script>

<!-- Nová část s spinnerem -->
{#if isPageLoading}
    <div class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-white z-50">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
    </div>
{/if}


<div class="flex">
    <div class="w-1/5">
        <NavigationDashboard {user}/>
    </div>
    <div class="w-4/5">
<slot/>
    </div>
</div>