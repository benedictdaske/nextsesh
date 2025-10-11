<script lang="ts">
	import { SessionStore } from '$stores/session-store'
	import { dateTimeToISOString } from '$lib/utils/datetime'
	import { callApi } from '$lib/utils/api'
	import { selected } from '$stores/selected-store';

	let { gymTimePoints, onclear } = $props()

	function onschedule() {
		// push new session to API
        if ($selected.startButtonIndex !== null && $selected.endButtonIndex !== null) {

			let startHour = gymTimePoints[$selected.startButtonIndex].hour,
				startMinute = gymTimePoints[$selected.startButtonIndex].minute
			let endHour = gymTimePoints[$selected.endButtonIndex].hour,
				endMinute = gymTimePoints[$selected.endButtonIndex].minute

			// iso date & selected gym
			let newFormattedSession = {
				gym: $selected.gym?.id,
				start: dateTimeToISOString($selected.date ?? null, startHour, startMinute),
				end: dateTimeToISOString($selected.date ?? null, endHour, endMinute),
				type: $selected.sessionType.types
			}

			// reset selection
			onclear()

			// call api & update store
			callApi('/sessions/', {
				method: 'POST',
				headers: {
      				"Content-Type": "application/json",
				},
				body: JSON.stringify(newFormattedSession)
			}).then(response => response.json()).then(data => {
				const transformedData = {
					...data,
					start: new Date(data.start),
					end: new Date(data.end),
				}
				SessionStore.update(prev => [...prev, transformedData])
			})

		} else {
			alert('Please select start and end time to schedule a session.')
		}
	}
</script>

<button onclick={onschedule} type="button" class="absolute right-1/2 translate-x-1/2 py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
	Schedule Session
</button>
