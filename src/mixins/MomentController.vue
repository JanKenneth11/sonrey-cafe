<script>
import moment from 'moment';
export default {
    data: () => ({

    }),
    methods: {
        convertDate(date) {
            // console.log(date);
            return moment(date).format('L');
        },
    },
}
</script>