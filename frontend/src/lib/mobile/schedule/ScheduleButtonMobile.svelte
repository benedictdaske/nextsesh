<script lang="ts">
	import { SessionStore } from '$stores/session-store'
	import { dateTimeToISOString } from '$lib/utils/datetime'
	import { callApi } from '$lib/utils/api'
	import { selected } from '$stores/selected-store';

	let { onclear } = $props()

	function onschedule() {
		// push new session to API
        if ($selected.startHour !== null && $selected.endHour !== null) {

			let startHour = $selected.startHour,
				startMinute = $selected.startMinute || 0
			let endHour = $selected.endHour,
				endMinute = $selected.endMinute || 0

			let newFormattedSession = {
				gym: $selected.gym?.id,
				start: dateTimeToISOString($selected.date ?? null, startHour, startMinute),
				end: dateTimeToISOString($selected.date ?? null, endHour, endMinute),
				type: $selected.sessionType
			}

			onclear()

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

<button onclick={onschedule} type="button" class="py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
	Schedule Session
</button>
